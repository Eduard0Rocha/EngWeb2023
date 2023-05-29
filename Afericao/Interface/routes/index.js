var express = require('express');
var router = express.Router();

var axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get("http://localhost:3001/api/emd")
       .then(r => {
        res.render('index', {list: r.data});
       })
       .catch(err => {
        res.render("error", {error: err})
       })
});

router.get("/emd/:id", function(req,res) {

  axios.get("http://localhost:3001/api/emd/" + req.params.id)
       .then(r => {
        res.render('emd', {item: r.data});
       })
       .catch(err => {
        res.render("error", {error: err})
       })
});

module.exports = router;
