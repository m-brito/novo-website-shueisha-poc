document.getElementById("menuAtivo").addEventListener("click", function(){
    document.querySelector("nav").classList.add("menuAtivoNav")
    document.querySelector("#conteudo").classList.add("menuAbertoOpacidade")
    document.querySelector(".carrossel").classList.add("menuAbertoOpacidade")
    document.querySelector("#rodape").classList.add("menuAbertoOpacidade")
    document.querySelector("#menuDesativa").classList.add("botaoMenuDesativaAtivado")
})
document.getElementById("menuDesativa").addEventListener("click", function(){
    document.querySelector("nav").classList.remove("menuAtivoNav")
    document.querySelector("#conteudo").classList.remove("menuAbertoOpacidade")
    document.querySelector(".carrossel").classList.remove("menuAbertoOpacidade")
    document.querySelector("#rodape").classList.remove("menuAbertoOpacidade")
    document.querySelector("#menuDesativa").classList.remove("botaoMenuDesativaAtivado")
})

var carrosselPausado = false;

document.querySelector("#controleCarrossel").addEventListener("click", () => {
    if(carrosselPausado==false) {
        carrosselPausado = true;
        document.getElementById("pausar").style.display = "none";
        document.getElementById("despausar").style.display = "flex";
    } else {
        carrosselPausado = false;
        document.getElementById("despausar").style.display = "none";
        document.getElementById("pausar").style.display = "flex";
    }
})

setInterval(() => {
    if(carrosselPausado==false) {
        imagemSeta(1);
    }
}, 5000);

var indiceImagem = 1;
mostrarImagem(indiceImagem);

function imagemSeta(indice){
    mostrarImagem(indiceImagem += indice);
}

function imagemBotao(indice){
    mostrarImagem(indiceImagem = indice);
}

function mostrarImagem(indice){
    var telas = document.getElementsByClassName("tela");
    var botoes = document.getElementsByClassName("botao");

    if(indice > telas.length){
        indiceImagem = 1;
    } else if(indice < 1) {
        indiceImagem = telas.length;
    }

    for(let x = 0; x < telas.length; x++) {
        telas[x].style.display = "none";
        if(x < botoes.length) {
            botoes[x].className = botoes[x].className.replace("ativado", "");
        }
    }

    telas[indiceImagem-1].style.display = "block";
    botoes[indiceImagem-1].className += " ativado";
}