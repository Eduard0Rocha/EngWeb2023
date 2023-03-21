var axios = require('axios')

// TarefaLIst
module.exports.list = () => {
    return axios.get('http://localhost:3000/tasks')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addtask = t => {
    t["done"]=false
    return axios.post('http://localhost:3000/tasks',t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteTask = t => {
    return axios.delete('http://localhost:3000/tasks/'+t.id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.completeTask = t => {
    return axios.put('http://localhost:3000/tasks/'+t.id,t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
