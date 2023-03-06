var http = require("http");
var axios = require('axios'); 
var mypages = require("./mypages");
var fs = require("fs");

http.createServer(function (req,res) {

    var d = new Date().toISOString().substring(0,16);

    console.log(req.method + " " + req.url + " " + d);

    if (req.url.includes("w3.css")) {
        
        fs.readFile("w3.css", function(err, data) {

            res.writeHead(200, {'Content-Type': 'text/css'});
    
            if (err) {
    
                res.write("Erro na leitura do ficheiro: " + err);
            }
    
            else {
    
                res.write(data);
            }
    
            res.end();
        })
    }

    else if (req.url == '/') {

        axios.get('http://localhost:3000/pessoas?_sort=nome&_ord=acs')

            .then(function(resp) {

                var pessoas = resp.data;

                console.log("Recuperei " + pessoas.length + " registos");

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end(mypages.genMainPage(pessoas,d));
            })

            .catch(erro => {

                console.log("ERRO: " + erro);
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<p>"+erro+"</p>");
            })
    }

    else if (req.url.substring(0,"/pessoas/p".length) == '/pessoas/p') {
        
        axios.get('http://localhost:3000/pessoas?_sort=nome&_ord=acs')

            .then(function(resp) {

                var pessoas = resp.data;

                let pessoa_id = parseInt(req.url.substring("/pessoas/p".length));

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end(mypages.genPessoaPage(pessoas[pessoa_id],d));
            })

            .catch(erro => {

                console.log("ERRO: " + erro);
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<p>"+erro+"</p>");
            })
    }

    else if (req.url.substring(0, "/pessoas/listaSexo/".length) == "/pessoas/listaSexo/") {

        let sexo = req.url.substring("/pessoas/listaSexo/".length);

        axios.get('http://localhost:3000/pessoas?_sort=nome&_ord=acs')

            .then(function(resp) {

                var pessoas = resp.data;

                let pessoa_id = parseInt(req.url.substring("/pessoas/p".length));

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end(mypages.genPagGenero(pessoas,sexo));
            })

            .catch(erro => {

                console.log("ERRO: " + erro);
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<p>"+erro+"</p>");
            })
    }

    else {

        console.log("Pedido não suportado")
    }

}).listen(7777);

console.log("À escuta na porta 7777");