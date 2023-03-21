var express = require('express');
var router = express.Router();
var tasks = require('../controllers/tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  tasks.list()
  .then(tasks => {

    var todo=[]
    var done=[]

    for(let i=0;i<tasks.length;i++){
        if (tasks[i].done) done.push(tasks[i])
        else todo.push(tasks[i])
    }
    res.render('index', {todo: todo, done:done})
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
  })
});

/* add new tarefa */
router.post('/', function(req, res, next) {
  tasks.addtask(req.body)
    .then(
      res.redirect("/")
    )
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

router.post('/', function(req, res, next) {
  tasks.addtask(req.body)
    .then(
      res.redirect("/")
    )
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

router.post('/delete', function(req, res, next) {
  tasks.deleteTask(req.body)
    .then(tarefa => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao apagar"})
    })
});

router.post('/complete', function(req, res, next) {
  tasks.completeTask(req.body)
    .then(tarefa => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao completar"})
    })
});

module.exports = router;