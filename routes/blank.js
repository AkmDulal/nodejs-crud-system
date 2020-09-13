var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/blank', function(req, res, next) {
  res.render('blank');
});



module.exports = router;
