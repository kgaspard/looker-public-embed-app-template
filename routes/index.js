var express = require('express');
var config = require('config');
const lookerApi = require('../middlewares/lookerApiMiddleware')
var router = express.Router();

/* GET pages. */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

const allowedDashboardIds = config.get('allowedDashboardIds')

router.get('/dashboard', function(req, res, next) {
  res.redirect(`/dashboard/${allowedDashboardIds[0]}`);
});

const checkValidity = (req, res, next) => {
  if( !(Date.now() < Date.parse(config.get('maxAllowedDate')) ) ){
    return res.status(403).send()
  }
  else if(!allowedDashboardIds.includes(req.params.id)) {
    return res.status(403).send()
  } else {
    next()
  }
}

router.get('/dashboard/:id', checkValidity, function(req, res, next) {
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
