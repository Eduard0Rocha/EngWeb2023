var http = require("http");
var fs = require("fs");
var url = require("url");

var servidor = http.createServer(function (req, res) {

    var pedido = url.parse(req.url, true).pathname;

    if (pedido != "/") {

        cidade = pedido.substring(1);

        fs.readFile("cidades/" + cidade + ".html", function(err, data) {

            res.writeHead(200, {'Content-Type': 'text/html'});

            if (err) {

                res.write("Erro na leitura do ficheiro: " + err);
            }

            else {

                res.write(data);
            }

            res.end();
        })
    }

    else {

        fs.readFile("index.html", function(err, data) {

            res.writeHead(200, {'Content-Type': 'text/html'});

            if (err) {

                res.write(err);
            }

            else {

                res.write(data);
            }

            res.end();
        });
    }
    
});

servidor.listen(5555);

console.log("À escuta na porta 5555");