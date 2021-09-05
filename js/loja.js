var listaEmergencia = [{"id":32,"image":"https://m.media-amazon.com/images/I/51q654bcafL.jpg","name":"Boruto Uzumaki: Funk o Pop! Vinyl Figure Bundle with 1 Compatible 'ToysDiva' Graphic Protector (671 - 45428 - B)","price":"29.98","url":"https://www.amazon.com/Boruto-Uzumaki-Compatible-ToysDiva-Protector/dp/B0857JQKFP/ref=sr_1_31?dchild=1&keywords=Funko+Boruto&qid=1629074051&sr=8-31","stars":"4.8"}, {"id":65,"image":"https://m.media-amazon.com/images/I/81MGKtXpdRL.jpg","name":"Chainsaw Man, Vol. 6 (6)","price":"9.99","url":"https://www.amazon.com/Chainsaw-Man-Vol-Tatsuki-Fujimoto/dp/1974720713/ref=sxin_12_birs_cobar_search?cv_ct_cx=Manga+Jujutsu+Kaisen&dchild=1&keywords=Manga+Jujutsu+Kaisen&pd_rd_i=1974720713&pd_rd_r=93a25ad9-42c4-4702-837a-534f78b5df63&pd_rd_w=AfJAp&pd_rd_wg=pLwag&pf_rd_p=2dcc5ab4-7d6f-401b-8ebf-0aecdf148e16&pf_rd_r=WCF7NT7PXC7HF7PGVEC1&qid=1629074201&sr=1-1-99af414c-1b7d-42c2-a92c-89941e88149f","stars":"4.9"},
{"id":57,"image":"https://m.media-amazon.com/images/I/91V9j2oQ9eL.jpg","name":"Jujutsu Kaisen 0: Blinding Darkness","price":"6.29","url":"https://www.amazon.com/Jujutsu-Kaisen-0-Blinding-Darkness-ebook/dp/B08R6QQ91L/ref=sr_1_11?dchild=1&keywords=Manga+Jujutsu+Kaisen&qid=1629074201&sr=8-11","stars":"4.9"}];

var loja = [];
var carrinho = ["0"];

async function produtosLoja() {
    const resp = await fetch(`https://pjtoapis.000webhostapp.com/classes/todosprodutos.php`, {
        "method": "GET",
    }).catch(function(e){
        document.querySelector(".principal-cartoes").innerHTML="";
        loja=listaEmergencia;
        mostrarListaProdutos(loja);
        return listaEmergencia;
        // alert("Ocorreu um erro vamos recarregar a pagina!")
        // location.reload();
    })
    
    const data = await resp.json()
    // const result = await data.results
    return data;
}

async function mostrarListaProdutos(produto) {
    for(let x=0; x<produto.length; x++) {
        var valor = 52.48;
        if(produto[x].price!=null) {
            valor = produto[x].price;
            // valor = valor.toFixed(2);
        }
        var achou = false;
        for(let y=0; y<carrinho.length; y++) {
            if(parseInt(carrinho[y])==produto[x].id){
                achou = true;
                break;
            }
        }
        if(!achou) {
            var cartao = `
            <div class="cartaoProduto" id="${produto[x].id}">
                <div class="carrinho" onclick="adicionaCarrinho(${produto[x].id})">carrinho</div>
                <div class="imagemProduto">
                    <img src="${produto[x].image}" alt="">
                </div>
                <p>${produto[x].name}</p>
                <h1>R$${(valor*5.25).toFixed(2)} ou US$${valor}</h1>
                <a href="${produto[x].url}" target="blank_">Mais Sobre</a>
            </div>
            `
            document.querySelector(".principal-cartoes").innerHTML+=cartao;
        }
        // console.log(produto[x])
    }
}

async function mostrarListaProdutosCarrinho(produto) {
    if(carrinho.length>1) {
        document.getElementById("finalizar").style.display = "flex";
    } else {
        document.getElementById("msgVazio").style.display="flex";
    }
    for(let x=0; x<produto.length; x++) {
        var valor = 52.48;
        if(produto[x].price!=null) {
            valor = produto[x].price;
            // valor = valor.toFixed(2);
        }
        var achou = false;
        for(let y=0; y<carrinho.length; y++) {
            if(parseInt(carrinho[y])==produto[x].id){
                achou = true;
                break;
            }
        }
        if(achou) {
            var cartao = `
            <div class="cartaoProduto" id="${produto[x].id}">
                <div class="excluirCarrinho" onclick="removerCarrinho(${produto[x].id})">excluir</div>
                <div class="imagemProduto">
                    <img src="${produto[x].image}" alt="">
                </div>
                <p>${produto[x].name}</p>
                <h1>R$${(valor*5.25).toFixed(2)} ou US$${valor}</h1>
                <a href="${produto[x].url}" target="blank_">Mais Sobre</a>
            </div>
            `
            document.querySelector("#telaCarrinhoCompras").innerHTML+=cartao;
        }
    }
}

function adicionaCarrinho(campo) {
    carrinho.push(campo);
    var carrinhoLista = getCookie("lojaLista").split("-");
    var strCookie = "";
    if(carrinhoLista[0]!="") {
        for(let x=0; x<carrinhoLista.length; x++) {
            strCookie+=carrinhoLista[x]+"-";
        }
    }
    strCookie+=campo;
    document.cookie = 'lojaLista='+strCookie;
    document.getElementById(campo).style.transform = "scale(0.01)";
    setTimeout(function() {
        document.getElementById(campo).style.display = "none";
    }, 1000)
    atualizaCarrinho()
}
async function removerCarrinho(campo) {
    for(let z=0; z<carrinho.length; z++) {
        if(carrinho[z]==campo){
            carrinho.splice(z, 1);
            break;
        }
    }
    var carrinhoLista = getCookie("lojaLista").split("-");
    var strCookie = "";
    var strCookieCorrigido = "";
    for(let x=0; x<carrinhoLista.length; x++) {
        if(parseInt(carrinhoLista[x])!=campo) {
            strCookie+=carrinhoLista[x]+"-"
        }
    }
    for(let y=0; y<strCookie.length-1; y++) {
        strCookieCorrigido += strCookie[y];
    }
    if(strCookieCorrigido=="") {
        document.cookie = 'lojaLista=0';
    }else {
        document.cookie = 'lojaLista='+strCookieCorrigido;
    }
    document.getElementById(campo).style.transform = "scale(0.01)";
    setTimeout(function() {
        document.getElementById(campo).style.display = "none";
    }, 1000)
    if(carrinho.length<=1) {
        document.getElementById("finalizar").style.display = "none";
        document.getElementById("msgVazio").style.display="flex";
    }
    atualizaCarrinho()
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function atualizaCarrinho(){
    var carrinhoLista = getCookie("lojaLista").split("-");
    if(carrinhoLista[0]!="" || carrinhoLista.length>1) {
        carrinho = carrinhoLista;
    } else {
        document.cookie = 'lojaLista=0';
    }
}

async function imprimirProdutos() {
    const produtos = await produtosLoja();
    atualizaCarrinho()
    loja=produtos
    document.querySelector(".principal-cartoes").innerHTML="";
    await mostrarListaProdutos(produtos)
}

async function mostrarCarrinho() {
    atualizaCarrinho()
    document.querySelector(".principal-cartoes").innerHTML="";
    document.getElementById("telaCarrinhoCompras").style.display = "flex";
    document.getElementById("carrinhoCompras").style.display = "none";
    await mostrarListaProdutosCarrinho(loja)
}
function voltarLoja(){
    document.getElementById("homeFeed").innerHTML = '<div class="titulo"><h2>Loja</h2></div><div class="principal-cartoes"><img src="img/carregando.gif" alt="carregando"></div>';
    document.getElementById("finalizar").style.display = "none";
    atualizaCarrinho()
    document.getElementById("telaCarrinhoCompras").style.display = "none";
    document.getElementById("carrinhoCompras").style.display = "flex";
    document.getElementById("telaCarrinhoCompras").innerHTML = "<div id='voltarLoja' onclick='voltarLoja()'>X</div><div id='finalizar' onclick='finalizarCompra()'>Finalizar</div><h1 id='msgVazio'>Carrinho Vazio</h1>";
    imprimirProdutos(loja)
}

function finalizarCompra() {
    location = "finalizarCarrinho.html";
    // window.open("finalizarCarrinho.html","_blank");
}

imprimirProdutos()