var express = require('express');
var config = require('config');
const Looker = require('../middlewares/lookerApiMiddleware')
var router = express.Router();

router.get('/sdkToken', (req,res,next) => {
  Looker.generateUserToken(req.session.userId)
  // .then(token => {console.log(token);return token;})
  .then(token => res.json(token))
  .catch(err => res.status(401).send(err))
})

router.get('/look', async (req,res,next) => {
  try{
    const lookResult = await Looker.runLookAsUser(req.session, config.get('lookId'))
    res.status(200).send(lookResult)
  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = router;
