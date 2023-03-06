// mypages.js
// 2023-03-01 by zeca

class MyDict {

    #keys;
    #values;
    #size;

    constructor() {

        this.#keys = [];
        this.#values = [];
        this.#size = 0;
    }

    #index_of_value(key) {

        return this.#keys.indexOf(key);
    }

    #add_entry(key) {

        this.#keys[this.#size] = key;
        this.#values[this.#size] = 1;
        this.#size++;
    }

    increment(key) {

        if (this.#keys.includes(key)) {
            
            this.#values[this.#index_of_value(key)]++;
        }

        else {

            this.#add_entry(key);
        }
    }

    get_value(key) {

        if (this.#keys.includes(key)) {

            return this.#values[this.#index_of_value(key)];
        }

        else return null;
    }

    get_top_10() {

        let res = [];

        for (let i = 0; i < 10 && i < this.#size; i++) {

            let bigger_nr = 0;
            let bigger_key = null;

            for (let j = 0; j < this.#size; j++) {

                if (res.includes(this.#keys[j])) continue;

                let key = this.#keys[j];
                let value = this.get_value(key);

                if (value > bigger_nr) {

                    bigger_nr = value;
                    bigger_key = key;
                }
            }

            res[i] = bigger_key;
        }

        return res;
    }

    get_keys() {

        let res = []

        for (let i = 0; i < this.#size; i++) {

            res[i] = this.#keys[i];
        }

        return res;
    }

    print() {

        for (let i = 0; i < this.#size; i++) {

            console.log("(" + this.#keys[i] + "," + this.#values[i] + ")");
        }
    }
}

exports.genMainPage = function(lista, data) {

    var pagHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About people...</title>
    <link rel="stylesheet" href="w3.css"/>
</head>
<body>

    <div class="w3-sidebar w3-bar-block" style="width:15%">
        <a href="#listaPessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
        <a href="#distPorSexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
        <a href="#" class="w3-bar-item w3-button">Distribuição por desporto</a>
        <a href="#" class="w3-bar-item w3-button">Top 10 de profissões</a>
    </div>

    <div style="margin-left:15%">

        <div class="w3-card-4" id="listaPessoas">
            <header class="w3-container w3-teal">
                <h1>Lista de pessoas na Base de Dados: ${lista.length}</h1>
            </header>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>
    `;

    for(let i = 0; i < lista.length; i++) {

        pagHTML += `
            <tr>
                <td>
                    <a href="http://localhost:7777/pessoas/p${i}">
                        ${lista[i].nome}</td>
                    </a>
                </td>
                <td>${lista[i].idade}</td>
                <td>${lista[i].sexo}</td>
                <td>${lista[i].morada.cidade}</td>
            </tr>
        `;
    }

    let distr_por_sexo = new MyDict();
    let distr_por_desporto = new MyDict();
    let distr_por_profissao = new MyDict();

    for (let i = 0; i < lista.length; i++) {

        let pessoa = lista[i];

        let sexo = pessoa.sexo;
        let desportos = pessoa.desportos;
        let profissao = pessoa.profissao;

        distr_por_sexo.increment(sexo);

        for (let j = 0; j < desportos.length; j++) {

            distr_por_desporto.increment(desportos[j]);
        }

        distr_por_profissao.increment(profissao);
    }

    let top_10_profissoes = distr_por_profissao.get_top_10();

    pagHTML += `
        </table>

    </div>

    <div class="w3-card-4" id="distPorSexo">
        <header class="w3-container w3-teal">
            <h1>Distribuição por sexo</h1>
        </header>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>`;

    let generos = distr_por_sexo.get_keys();

    for (let i = 0; i < generos.length; i++) {

        pagHTML += `<th><a href="http://localhost:7777/pessoas/listaSexo/${generos[i]}">${generos[i]}</a></th>`
    }
    
    pagHTML +=  `</tr><tr>`

    for (let i = 0; i < generos.length; i++) {

        pagHTML += `<th>${distr_por_sexo.get_value(generos[i])}</th>`
    }

    pagHTML += `</tr><div>
        </div>
    </div>
</body>
</html>
    `;

    return pagHTML;
}

exports.genPessoaPage = function(pessoa, data) {

    var pagHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About people...</title>
    <link rel="stylesheet" href="w3.css"/>
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-teal">
            <h1>${pessoa.nome}</h1>
        </header>
    <div class="w3-container">
        <p>Idade: ${pessoa.idade}</p>
        <p>Sexo: ${pessoa.sexo}</p>
        <p>Cidade: ${pessoa.morada.cidade}</p>
        <p>Distrito: ${pessoa.morada.distrito}</p>
        <p>Profissão: ${pessoa.profissao}</p>
        <a href="/">[Voltar]</a>
    </div>
        <footer class="w3-container w3-teal">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer>
    </div>
</body>
</html>
    `;

    return pagHTML;
}

exports.genPagGenero = function (pessoas, genero) {

    var pagHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About people...</title>
    <link rel="stylesheet" href="w3.css"/>
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-teal">
            <h1>Lista de Pessoas do Sexo: ${genero}</h1>
            <a href="/">[Voltar]</a>
        </header>
        <div class="w3-container">
        <table class="w3-table-all">
            <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Cidade</th>
            </tr>
    `;

    for(let i = 0; i < pessoas.length; i++) {

        if (pessoas[i].sexo != genero) continue;

        pagHTML += `
            <tr>
                <td>
                    <a href="http://localhost:7777/pessoas/p${i}">
                        ${pessoas[i].nome}</td>
                    </a>
                </td>
                <td>${pessoas[i].idade}</td>
                <td>${pessoas[i].sexo}</td>
                <td>${pessoas[i].morada.cidade}</td>
            </tr>
        `;
    }

    pagHTML += `
</body>
</html>
    `;

    return pagHTML;
}