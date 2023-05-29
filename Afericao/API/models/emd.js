var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var emdSchema = new Schema({
    _id: String,
    index: Number,
    dataEMD: Date,
    nome: { 
        primeiro: String, 
        último: String 
    },
    idade: Number,
    género: String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
});

module.exports = mongoose.model('EMD', emdSchema, 'exames' );