import json

def ordCidade(cidade):

    return cidade["nome"]

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa["cidades"]
cidades.sort(key=ordCidade)
ligacoes = mapa["ligações"]

pagHTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa Virtual</title>
</head>
<body>

    <h1>Mapa Virtual</h1>

    <table>

        <tr valign="top">
            <!-- Coluna do Índice-->
            <td>
                <h3>Índice</h3>
                <ol>
"""

for c in cidades:

    pagHTML += f"<li><a href='#{c['id']}'>{c['nome']}</a></li>"

pagHTML += """
</ol>
            </td>

            <!-- Coluna do conteúdo -->
            <td style="width:70%">
"""

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

        res += f"<p><a href=#{dest[0]}>{id_to_nome(dest[0])}</a>: {dest[1]}</p>"

    return res

for c in cidades:

    pagHTML += f"""
        <a name="{c['id']}"></a>
                <h3>{c['nome']}</h3>
                <p><b>Distrito:</b> {c['distrito']}</p>
                <p><b>População:</b> {c['população']}</p>
                <p><b>Descrição:</b> {c['descrição']}</p>
                {html_destinos_conectados(c['id'])}
                <a href="#">[Voltar ao início]</a>
                <center>
                    <hr width="80%">
                </center>
"""

pagHTML += """
            </td>
        </tr>

    </table>
</body>
</html>
"""


print(pagHTML)