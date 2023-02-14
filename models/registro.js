const mongoose = require('mongoose');

// Definición del esquema
let registroSchema = new mongoose.Schema({
    nombrej:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    puntos: {
        type: Number,
        required: true,
        minlength: 1,

    }
});

// Asociación con el modelo
let registro = mongoose.model('registro', registroSchema);

module.exports = registro;
