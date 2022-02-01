const path = require('path');
const axios = require ('axios');
const config = require('config');
import { LookerNodeSDK, NodeSettings } from '@looker/sdk';

const sdk = LookerNodeSDK.init40(new NodeSettings())

exports.createSsoEmbedUrl = async (src) => {

  const body = {
    target_url: 'https://'+path.join(process.env.LOOKER_INSTANCE,src),
    session_length: 15 * 60,
    external_user_id: config.get('user.externalId'),
    force_logout_login: true,
    first_name: config.get('user.name'),
    last_name: '',
    permissions: config.get('user.permissions'),
    models: config.get('user.models'),
    user_attributes: config.get('user.userAttributes')
  };
  const urlObject = await sdk.ok(sdk.create_sso_embed_url(body))
  return urlObject
}