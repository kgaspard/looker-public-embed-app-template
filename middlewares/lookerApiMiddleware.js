const path = require('path');
const request = require ('request')
import { LookerNodeSDK, NodeSettings } from '@looker/sdk';

const sdk = LookerNodeSDK.init40(new NodeSettings())

const createUserFromSession = (session, callback) => {
  module.exports.createSsoEmbedUrl(session, 'alive', (err, result) => {
    if(err){return callback(err)}
    else {
      request(result.url, (err, response) => {
        if(err){return callback(err)}
        return sdk.ok(sdk.user_for_credential('embed',session.userId))
        .then(user => callback(null,user))
        .catch(err => callback(err))
      })
    }
  });
}

exports.getLookerEmbedUserFromSession = (session, forceCreateUser, callback) => {
  //first check if Looker user ID exists
  sdk.ok(sdk.user_for_credential('embed',session.userId))
  .then(user => {
    if(forceCreateUser){ return createUserFromSession(session, callback)}
    else{return callback(null, user);}
  })
  // if not, create one by creating an SSO embed URL and calling it
    // perhaps more efficient to use https://docs.looker.com/reference/api-and-integration/api-reference/v3.1/user#parameters_3, but less code to worry about this way, and only called upon first user login anyway
  .catch(err => {
    if(err.message && err.message.startsWith('404')){
      return createUserFromSession(session, callback)
    } else {
      return callback(err)
    }
  })
}

exports.createSsoEmbedUrl = (session, src, callback) => {

  const body = {
    target_url: 'https://'+path.join(process.env.LOOKER_INSTANCE,src),
    session_length: 15 * 60,
    external_user_id: session.userId,
    force_logout_login: true,
    first_name: session.userName,
    last_name: '',
    permissions: session.permissions,
    models: session.models,
    // group_ids: [session.groupId],
    external_group_id: session.external_group_id,
    user_attributes: session.user_attributes
  };
  sdk.ok(sdk.create_sso_embed_url(body))
  .then(response => callback(null,response))
  .catch(err => callback(err))
}

exports.generateUserToken = async (external_user_id) => {
  const userCred = await sdk.ok(sdk.user_for_credential('embed', external_user_id));
  const embed_user_token = await sdk.login_user(userCred.id.toString())
  const u = {
    user_token: embed_user_token.value,
    token_last_refreshed: Date.now()
  }
  return u;
}

exports.runLookAsUser = async (session, lookId) => {
  const auth = sdk.authSession
  const user = await sdk.ok(sdk.user_for_credential('embed',session.userId))
  await auth.login(user.id)
  const lookResult = await sdk.ok(sdk.run_look({look_id: lookId, result_format: 'json'}))
  await sdk.authSession.logout() // logout of sudo
  return lookResult
}