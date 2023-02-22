var express = require('express');
var router = express.Router();
let registro = require('../models/registro.js');

/* GET home page. */
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
router.get('/', (req, res) => {
  registro.find().sort({puntos:-1}).then(resultado => {
      res.render('lista_registro', {registros: resultado});            
  }).catch(error => {
      res.render('lista_registro', {registros: []});
  })
});
module.exports = router;
