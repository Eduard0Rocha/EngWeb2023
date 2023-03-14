var http = require("http");
var axios = require('axios');
var fs = require("fs");
var mypages = require("./mypages");
const { parse } = require('querystring');

var tasks;

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var myServer = http.createServer(function (req, res) {

    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.url.endsWith("w3.css")) {

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

    else {

        switch(req.method) {

            case "GET": {

                if (req.url == "/") {

                    axios.get("http://localhost:3000/tasks?_sort=id")
                        .then(response => {
                            tasks = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(mypages.mainPage(tasks))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }

                else if (/\/task\/[0-9]+$/i.test(req.url)) {
                    
                    var idTask = req.url.split("/")[2];

                    axios.get("http://localhost:3000/tasks/"+idTask)
                        .then(response => {
                            var task = response.data
                            console.log(task.what);
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(mypages.taskPage(task))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                
                break;
            }

            case "POST": {

                if(req.url == "/"){
                    
                    collectRequestBodyData(req, task => {
                        if(task){
                            task["done"] = false;
                            axios.post("http://localhost:3000/tasks",task)
                            .catch(erro => {
                                console.log("Erro: "+ erro)
                                res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                                res.write(mypages.mainPage(tasks))
                                res.end("ERRO: "+ erro)
                            })   
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }

                // TODO
                
                break;
            }

            default: {

                es.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
            }
        }
    }
})

myServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
