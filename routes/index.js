var express = require('express');
var config = require('config');
const lookerApi = require('../middlewares/lookerApiMiddleware')
var router = express.Router();

/* GET pages. */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/dashboard', function(req, res, next) {
  res.redirect(`/dashboard/${config.get('defaultDashboardId')}`);
});

router.get('/dashboard/:id', function(req, res, next) {
  res.render('dashboard', { title: `${config.get('organisationName')} Dashboard`, config: config, dashboardId: req.params.id });
});

/* POSTS */

router.get('/lookerEmbedAuth', async function(req, res, next){
  try {
    const urlObject = await lookerApi.createSsoEmbedUrl(req.query.src)
    const url = urlObject.url
    res.json({url});
  } catch(err) {
    next(err)
  }
});

module.exports = router;
