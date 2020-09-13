var express = require('express');
var router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// forwardAuthenticated
/* GET home page. */
router.get('/dashboard', ensureAuthenticated ,  function(req, res, next) {
  res.render('dashboard');
});



module.exports = router;
