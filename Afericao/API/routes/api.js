var express = require('express');
var router = express.Router();

var EMD = require("../controllers/emd");

router.get('/emd', function(req, res, next) {

    if (!req.query.res && !req.query.modalidade) {

        EMD.list()
        .then(data => {
            res.status(200).jsonp(data);
        })
        .catch(erro => {
            res.status(500).jsonp(err);
        });
    }

    else next();
});

router.get('/emd', function(req,res,next) {

    if (req.query.res == "OK") {

        EMD.resOK()
        .then(data => {
            res.status(200).jsonp(data);
        })
        .catch(erro => {
            res.status(500).jsonp(err);
        });
    }

    else next();
})

router.get('/emd', function(req,res) {

    var modalidade = req.query.modalidade;

    if (modalidade) {

        EMD.modalidade(modalidade)
           .then(data => {
            res.status(200).json(data);
           })
           .catch(erro => {
            res.status(500).json(erro);
           })
    }
})

router.get('/emd/:id', function(req, res) {

    EMD.detail(req.params.id)
       .then(data => {
        res.status(200).jsonp(data);
       })
       .catch(erro => {
        res.status(500).jsonp(err)
       })
});

router.get('/modalidades', function(req,res) {

    EMD.modalidades()
       .then(data => {
        res.status(200).jsonp(data);
       })
       .catch(erro => {
        res.status(500).jsonp(erro);
       })
});

router.get('/atletas', function(req,res,next) {

    if (req.query.gen == "F") {

        EMD.atletasF()
           .then(data => {
            res.status(200).json(data);
           })
           .catch(erro => {
            res.status(500).json(erro);
           })
    }

    else next();
})

router.get('/atletas', function(req,res) {

    var clube = req.query.clube;

    if (clube) {

        EMD.clube(clube)
           .then(data => {
            res.status(200).json(data);
           })
           .catch(erro => {
            res.status(500).json(erro);
           })
    }
})

module.exports = router;
