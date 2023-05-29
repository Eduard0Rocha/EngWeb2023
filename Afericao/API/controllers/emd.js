var EMD = require("../models/emd");

module.exports.list = () => {

    return EMD.find({}, {"_id": 1, "nome": 1, "data": 1, "resultado": 1})
              .sort({"nome.primeiro": 1})
              .then(res => {
                return res;
              })
              .catch(err => {
                return err;
              })
}

module.exports.detail = id => {

    return EMD.findOne({_id: id})
              .then(res => {
                return res;
              })
              .catch(err => {
                return err;
              })
}

module.exports.modalidades = () => {

    return EMD.distinct("modalidade")
              .then(res => {
                return res;
              })
              .catch(err => {
                return err;
              })
}

module.exports.resOK = () => {

    return EMD.find({"resultado": true})
              .then(data => {
                return data;
              })
              .catch(err => {
                return err;
              })
}

module.exports.modalidade = x => {

    return EMD.find({"modalidade": x})
              .then(data => {
                return data;
              })
              .catch(err => {
                return err;
              })
}

module.exports.atletasF = () => {

    return EMD.find({"género":"F"},{"nome.primeiro":1, "_id":0, "nome.último":1})
              .sort({"nome.primeiro":1})
              .then(data => {
                return data;
              })
              .catch(err => {
                return err;
              })
}

module.exports.clube = x => {

    return EMD.find({"clube":x}, {"_id": 0, "nome.primeiro":1, "nome.último":1})
              .sort({"nome.primeiro": 1, "nome.último": 1})
              .then(data => {
                return data;
              })
              .catch(err => {
                return err;
              })
}