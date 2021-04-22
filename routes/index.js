var express = require('express');
var config = require('config');
const sessionMiddleware = require('../middlewares/sessionMiddleware')
const lookerApi = require('../middlewares/lookerApiMiddleware')
var router = express.Router();

/* GET pages. */
router.get('/', function(req, res, next) {
  sessionMiddleware.redirectToLogin(req,res);
  res.render('index', { title: 'Home', session: req.session, config: config });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign in', config: config});
});

router.get('/dashboard', function(req, res, next) {
  sessionMiddleware.redirectToLogin(req,res);
  res.render('dashboard', { title: 'iframe Dashboard', session: req.session, config: config, dashboardId: req.query.dashboard });
});

router.get('/explore', function(req, res, next) {
  sessionMiddleware.redirectToLogin(req,res);
  res.render('explore', { title: 'iframe Explore', session: req.session, config: config });
});

router.get('/apiExample', function(req, res, next) {
  sessionMiddleware.redirectToLogin(req,res);
  res.render('apiExample', { title: 'API Example', session: req.session, config: config, dashboardId: req.query.dashboard });
});

/* POSTS */
router.post('/login', function(req, res, next){
  sessionMiddleware.setSessionParameters(req);
  // get Looker user info, and create one if they don't exist
    // Here, creating a user everytime anyway because for this demo app, we're sometimes changing their permissions and we have to recreate/update them in Looker to update this.
  lookerApi.getLookerEmbedUserFromSession(req.session, true, (err,user) => {
    if(err){return next(err)}
    else{
      req.session.looker_user_id = user.id;
      req.session.personal_space_id = user.personal_space_id;
      if(user.embed_group_space_id){req.session.embed_group_space_id = user.embed_group_space_id;}
      res.redirect('/');
    }
  })
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/login');
});

router.get('/lookerEmbedAuth', function(req, res, next){
  lookerApi.createSsoEmbedUrl(req.session, req.query.src, (err, result) => {
    if(err){return next(err)}
    else{
      const url = result.url
      res.json({url});
    }
  });
});

/* POSTS */

module.exports = router;
