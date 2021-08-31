var manga = parametroDoUrl("manga");
mostrarMangas()
// document.cookie = "username=John Dasdfasdfoe";
// salvar em cookie;

function urlParaCompartilhar() {
    var url = "https://mauricio-projeto.netlify.app/animes/"+window.location.href.split("/animes/")[1];
    var botoes = `
    <div id="whatsapp">
        <img src="../img/whatsapp.jpg" alt="whatsapp">
        <p>Compartilhar</p>
    </div>
    <div id="twitter">
        <img src="../img/twitter.png" alt="whatsapp">
        <p>Compartilhar</p>
    </div>`
    document.getElementById("compartilharPagina").innerHTML = botoes;
    document.getElementById("whatsapp").addEventListener("click", (e) => {
        window.open(`https://api.whatsapp.com/send?text=Olá venha conferir tudo sobre ${decodeURI(manga)}!!! disponivel em: ${encodeURI(url)} &via=ProjetoMauricio&hashtags=${decodeURI(manga).split(" ").join("")}`,"_blank");
    })
    document.getElementById("twitter").addEventListener("click", (e) => {
        window.open(`https://twitter.com/intent/tweet?&text=Olá venha conferir tudo sobre ${decodeURI(manga)}!!! disponivel em: ${encodeURI(url)} &via=ProjetoMauricio&hashtags=${decodeURI(manga).split(" ").join("")}`,"_blank");
    })
}

function parametroDoUrl(parametro) {
    var url = location.search.substring(1, location.search.length);
    var valorParametro = false;
    var parametros = url.split("&");
    for (i=0; i<parametros.length;i++) {
        nomeParametro = parametros[i].substring(0,parametros[i].indexOf('='));
        if (nomeParametro == parametro) {
            valorParametro = parametros[i].substring(parametros[i].indexOf('=')+1)
        }
    }
    if (valorParametro) {
        return valorParametro;
    }
    else {
        return undefined;
    }
}

async function pegarMangaUrl(){
    const resp = await fetch(`https://jikan1.p.rapidapi.com/search/manga?q=${manga}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2dba171373msh69cb522f708c18bp155cbbjsn8a376a6c365b",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }}
    )
    const data = await resp.json()
    const result = await data.results
    return result;
}

async function pegarPersonagens(id) {
    const resp = await fetch(`https://jikan1.p.rapidapi.com/manga/${id}/characters`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2dba171373msh69cb522f708c18bp155cbbjsn8a376a6c365b",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }}
    )
    const data = await resp.json()
    return data.characters;
}
async function musicasManga(nome) {
    const resp = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${nome}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "2dba171373msh69cb522f708c18bp155cbbjsn8a376a6c365b"
        }
    })
    const data = await resp.json()
    return data;
}

async function newsManga(paramId) {
    const resp = await fetch(`https://jikan1.p.rapidapi.com/manga/${paramId}/news`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2dba171373msh69cb522f708c18bp155cbbjsn8a376a6c365b",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }}
    )
    const data = await resp.json();
    return data.articles;
}

async function preencherMusicas(personagem) {
    document.getElementById("mediasManga").innerHTML = "<h1 style='color: white;'>Mídias</h1>";
    // const nomePesquisa = decodeURI(manga).split(" ").join("").split(" ")[0].split(":")[0].split(" ")[0];
    var nomePesquisa = "rap do "+personagem.name.split(",")[personagem.name.split(",").length-1];
    if(nomePesquisa=="rap do Mitsuki") {
        nomePesquisa = "rap do Boruto";
    } else if(nomePesquisa=="rap do Brook") {
        nomePesquisa = "rap do Luffy";
    } else if(nomePesquisa=="rap do Bulma") {
        nomePesquisa = "rap do Goku";
    }
    var tam = 3;
    data = await musicasManga(nomePesquisa);
    if(data.data.length<3){tam = data.data.length}
    for(let x=0; x<tam; x++) {
        // data.data.length
        cartao = `
        <div class="cartaoMedia">
            <p>#${x+1}</p>
            <a href="${data.data[x].link}" target="blank_">
                <img src="https://cdns-images.dzcdn.net/images/cover/${data.data[x].md5_image}/300x300-000000-80-0-0.png" alt="imagem manga">
            </a>
            <audio controls id="${data.data[x].id}">
                <source src="${data.data[x].preview}" type="audio/mp3">
                Seu navegador não tem suporte a este recurso!!
            </audio>
        </div>
        `
        document.getElementById("mediasManga").innerHTML += cartao;
        setTimeout(() => {
            document.getElementById(data.data[x].id).volume = 0.2;
        }, 1000)
    }
}

function mostrarPersonagens(personagensManga) {
    document.getElementById("personagens").innerHTML="<h1>Personagens Principais</h1>";
    for(let a=0; a<personagensManga.length; a++) {
        if(personagensManga[a].role=="Main") {
            document.getElementById("personagens").innerHTML+=`
                <a href="${personagensManga[a].url}" target="blank_">
                    <div class="imagemCartao">
                        <img src="${personagensManga[a].image_url}" alt="personagem">
                    </div>
                    <div class="conteudoCartao">
                        <h2>${personagensManga[a].name}</h2>
                        <p>${personagensManga[a].role}</p>
                        <p>Saiba mais!!!</p>
                    </div>
                </a>
            `
        }
    }
}
async function mostrarOutrasNoticias(noticias) {
    document.getElementById("outrosSobreManga").innerHTML = "<h1>Relacionado</h1><div id='conteudoCartoesOutros'>";
    for(let x=0; x<10; x++) {
        document.getElementById("conteudoCartoesOutros").innerHTML+=`
        <div class="cartaoOutros">
            <div class="divOutrosImagem">
                <img src="${noticias[x].image_url}" alt="${noticias[x].title}">
            </div>
            <div class="conteudoOutros">
                <h2>${noticias[x].title}</h2>
                <p>${noticias[x].intro}</p> <br>
                <p class="comentarios"><strong>Comentarios:</strong> ${noticias[x].comments}</p>
            </div>
            <a href="${noticias[x].url}" style="text-align: center;" target="blank_">Mais Sobre</a>
        </div>
    `}
}

async function pegarIdMangaUrl(){
    let idManga;
    let mangaUrl = await pegarMangaUrl();
    let nomeComparar = "";
    let mangaFormatado = manga.split("%20");
    for(let z=0; z<mangaFormatado.length; z++) {
        if(z<mangaFormatado.length-1) {
            nomeComparar += mangaFormatado[z]+" ";
        } else {
            nomeComparar += mangaFormatado[z];
        }
    }
    for(let x=0; x<10; x++) {
        if(mangaUrl[x].title.toUpperCase() == nomeComparar.toUpperCase()) {
            idManga = mangaUrl[x].mal_id;
        }
    }
    return idManga;
}

async function mostrarMangas() {
    let idDoManga = await pegarIdMangaUrl();
    urlParaCompartilhar()
    // preencherMusicas()
    const personagens = await pegarPersonagens(idDoManga)
    preencherMusicas(personagens[0])
    mostrarPersonagens(personagens)
    const noticiasManga = await newsManga(idDoManga)
    mostrarOutrasNoticias(noticiasManga)
}