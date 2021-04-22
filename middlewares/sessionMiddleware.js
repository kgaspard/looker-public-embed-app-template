const config = require('config');

exports.setSessionParameters = async (req) => {
  const userType = req.body.usertype

  req.session.lookerUrl = process.env.LOOKER_INSTANCE
  req.session.userId = req.body.name
  req.session.userName = req.body.name
  req.session.userType = userType
  req.session.permissions = config.get(`users.${userType}.permissions`)
  req.session.models = config.get(`users.${userType}.models`)
  req.session.user_attributes = config.get(`users.${userType}.userAttributes`)
  // req.session.external_group_id = (req.body.group || null);
  await req.session.save()
  return 0;
};

exports.redirectToLogin = (req,res) => {
  if(!req.session.userId || !req.session.userType){return res.redirect('/login');}
}