var express = require('express');
var router = express.Router();

// GET the homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Master Mind Game' });
});

// GET about page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Su Master Mind Game' });
});


module.exports = router;
