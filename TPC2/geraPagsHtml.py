import json

def ordCidade(cidade):

    return cidade["nome"]

f = open("mapa.json")
mapa = json.load(f)
f.close()

cidades = mapa["cidades"]
cidades.sort(key=ordCidade)

ligacoes = mapa["ligações"]

distritos = list(set([x["distrito"] for x in cidades]))
distritos.sort()

# Returns [(cidade_ID,cidade_NOME)]
def getCidadesPorDistrito(distrito):

    res = []

    for c in cidades:

        if (c["distrito"] == distrito):

            res.append((c["id"],c["nome"]))

    return res

def geraHTMLIndex():

    res = """<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cidades</title>
            </head>
            <body>\n"""

    for d in distritos:

        res += f"<h1>{d}</h1><ul>\n"

        cidades_de_d = getCidadesPorDistrito(d)

        for c_id,c_nome in cidades_de_d:

            res += f"<li><a href='/{c_id}' target='blank'>{c_nome}</a></li>\n"

        res += "</ul>"

    res += "</body></html>"

    return res

def geraFichIndexHTML():

    f = open("index.html", "w")

    f.write(geraHTMLIndex())

    f.close()

def procura_destinos(origem):

    res = list()

    for l in ligacoes:

        if (l['origem'] == origem):

            res.append((l['destino'],l['distância']))

    return res

def id_to_nome(id):

    for c in cidades:

        if (c['id'] == id):

            return c['nome']

    return None

def html_destinos_conectados(id):

    res = f"<p><b>Destinos proximos:</b></p>"

    destinos_ids_dist = procura_destinos(id)

    for dest in destinos_ids_dist:

        res += f"<p><a href=/{dest[0]}>{id_to_nome(dest[0])}</a>: {dest[1]}</p>"

    return res

def geraHTMLCidade(cidade):

    res = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cidade1</title>
</head>
<body>
    <h1>{cidade['nome']}</h1>
    <p>População: {cidade['população']}</p>
    <p>Descrição: {cidade['descrição']}</p>
    <p>Distrito: {cidade['distrito']}</p>
    {html_destinos_conectados(cidade['id'])}
    <p><a href='/'>[Voltar]</a></p>
</body>
</html>
    """

    return res

def geraPagCidade(cidade):

    f = open(f"cidades/{cidade['id']}.html", "w")

    f.write(geraHTMLCidade(cidade))

    f.close()

def geraFichPagsCidades():

    for cidade in cidades:

        geraPagCidade(cidade)

def main():

    geraFichIndexHTML()
    geraFichPagsCidades()

main()