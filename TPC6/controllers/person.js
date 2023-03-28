var Person = require('../models/person')

// Person list
module.exports.list = () => {
    return Person
        .find()
        .sort({nome:1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPerson = id => {
    return Person.findOne({_id: id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPerson = a => {
    return Person.create(a)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePerson = a => {
    return Person.updateOne({_id: a._id}, a)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person.deleteOne({_id: id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}