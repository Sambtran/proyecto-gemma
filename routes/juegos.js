var express = require('express');
var router = express.Router();
router.get('/square', function(req, res, next) {
    res.render('square');
  });
  router.get('/ahorcado', function(req, res, next) {
    res.render('ahorcado');
  });
  router.get('/', function(req, res, next) {
    res.render('juegos');
  });
  module.exports = router;
