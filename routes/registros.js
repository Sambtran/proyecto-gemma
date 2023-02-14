var express = require('express');
var router = express.Router();
let registro = require(__dirname + '/../models/registro.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dino');
});
router.post('/', (req, res) => {
  let nuevoregistro = new registro({
      nombrej: req.body.nombrej,
      nombre: req.body.nombre,
      puntos: req.body.puntos

  });
  nuevoregistro.save().then(resultado => {
      res.send({error: false, resultado: resultado});
  }).catch(error => {
      res.send({error: true, mensajeError:"Error añadiendo registro"});
  });
});
module.exports = router;
