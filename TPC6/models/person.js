var mongoose = require('mongoose')

var personSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    idade: Number,
    sexo: String,
})

module.exports = mongoose.model('person', personSchema)

