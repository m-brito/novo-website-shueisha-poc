// ==============Dados caso de erro na requisicao====================

var listaEmergencia = [{"id":32,"image":"https://m.media-amazon.com/images/I/51q654bcafL.jpg","name":"Boruto Uzumaki: Funk o Pop! Vinyl Figure Bundle with 1 Compatible 'ToysDiva' Graphic Protector (671 - 45428 - B)","price":"29.98","url":"https://www.amazon.com/Boruto-Uzumaki-Compatible-ToysDiva-Protector/dp/B0857JQKFP/ref=sr_1_31?dchild=1&keywords=Funko+Boruto&qid=1629074051&sr=8-31","stars":"4.8"}, {"id":65,"image":"https://m.media-amazon.com/images/I/81MGKtXpdRL.jpg","name":"Chainsaw Man, Vol. 6 (6)","price":"9.99","url":"https://www.amazon.com/Chainsaw-Man-Vol-Tatsuki-Fujimoto/dp/1974720713/ref=sxin_12_birs_cobar_search?cv_ct_cx=Manga+Jujutsu+Kaisen&dchild=1&keywords=Manga+Jujutsu+Kaisen&pd_rd_i=1974720713&pd_rd_r=93a25ad9-42c4-4702-837a-534f78b5df63&pd_rd_w=AfJAp&pd_rd_wg=pLwag&pf_rd_p=2dcc5ab4-7d6f-401b-8ebf-0aecdf148e16&pf_rd_r=WCF7NT7PXC7HF7PGVEC1&qid=1629074201&sr=1-1-99af414c-1b7d-42c2-a92c-89941e88149f","stars":"4.9"},
{"id":57,"image":"https://m.media-amazon.com/images/I/91V9j2oQ9eL.jpg","name":"Jujutsu Kaisen 0: Blinding Darkness","price":"6.29","url":"https://www.amazon.com/Jujutsu-Kaisen-0-Blinding-Darkness-ebook/dp/B08R6QQ91L/ref=sr_1_11?dchild=1&keywords=Manga+Jujutsu+Kaisen&qid=1629074201&sr=8-11","stars":"4.9"}];

// ========================variaveis globais===================
var loja = [];
var carrinho = ["0"];
var totalReal = 0;
var totalDolar = 0;


// =================================Operacoes menu responsivo==================
document.querySelector("#menuAtivo").addEventListener("click", function(){
    document.querySelector("nav").classList.add("menuAtivoNav")
    document.querySelector("#conteudo").classList.add("menuAbertoOpacidade")
    document.querySelector("#rodape").classList.add("menuAbertoOpacidade")
    document.querySelector("#menuDesativa").classList.add("botaoMenuDesativaAtivado")
})
document.getElementById("menuDesativa").addEventListener("click", function(){
    document.querySelector("nav").classList.remove("menuAtivoNav")
    document.querySelector("#conteudo").classList.remove("menuAbertoOpacidade")
    document.querySelector("#rodape").classList.remove("menuAbertoOpacidade")
    document.querySelector("#menuDesativa").classList.remove("botaoMenuDesativaAtivado")
})

// ======================================LOJA=================================


// ==============Pegar produtos ou se der erro mostrar produtos da 'lista de emergencia' que estao no carrinho================
async function produtosLoja() {
    const resp = await fetch(`/classes/todosprodutos.php`, {
        "method": "GET",
    }).catch(function(e){
        loja=listaEmergencia;
        atualizaCarrinho();
        for(let x=0; x<loja.length; x++) {
            var valor = 52.48;
            if(loja[x].price!=null) {
                valor = loja[x].price;
                // valor = valor.toFixed(2);
            }
            var achou = false;
            for(let y=0; y<carrinho.length; y++) {
                if(parseInt(carrinho[y])==loja[x].id){
                    achou = true;
                    break;
                }
            }
            if(achou) {
                totalReal += parseFloat(loja[x].price)*5.25;
                totalDolar += parseFloat(loja[x].price);
                document.querySelector("#itensBoleto").innerHTML += `
                    <div class="cartaoProduto">
                        <img src="${loja[x].image}" alt="${loja[x].name}">
                        <div class="dadosItemCarrinho">
                            <p>${loja[x].name}</p>
                            <p>R$${(parseFloat(loja[x].price)*5.25).toFixed(2)} ou US$${(parseFloat(loja[x].price)).toFixed(2)}</p>
                        </div>
                    </div>
                `
            }
        }
        document.getElementById("conteudoResumo").innerHTML = `
            <div class="grupoDadosResumo">
                <p><strong>Produtos</strong></p>
                <p>${carrinho.length-1} itens</p>
            </div>
            <div class="grupoDadosResumo">
                <p><strong>Frete</strong></p>
                <p style='color: green'><strong>Gratis</strong></p>
            </div>
            <div class="grupoDadosResumo">
                <p><strong>Total Real</strong></p>
                <p>R$${totalReal.toFixed(2)}</p>
            </div>
            <div class="grupoDadosResumo" id="ultimo">
                <p><strong>Total Dolar</strong></p>
                <p>US$${totalDolar.toFixed(2)}</p>
            </div>
            <div id="confirmarCompra"><p>Finalizar</p></div>
        `
        document.querySelector("#confirmarCompra").addEventListener("click", function() {
            const data = new Date();
            const dia = String(data.getDate()).padStart(2, '0');
            const diaVencimento = parseInt(dia) + 2;
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            const nome = pegarDadoCookie("nome");
            const telefone = pegarDadoCookie("telefone");
            const rua = pegarDadoCookie("rua");
            const bairro = pegarDadoCookie("bairro");
            const numero = pegarDadoCookie("numero");
            const idEstado = pegarDadoCookie("idEstado");
            const estado = pegarDadoCookie("estado");
            const cidade = pegarDadoCookie("cidade");
            document.cookie = 'lojaLista=0';
            window.open(`http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Shueisha&data_documento=${dia}%2F${mes}%2F${ano}&numero_documento=DF+00113&especie=&aceite=N&data_processamento=${dia}%2F${mes}%2F${ano}&uso_banco=&carteira=179&especie_moeda=Real&quantidade=${carrinho.length-1}&valor=&vencimento=${diaVencimento}%2F${mes}%2F${ano}&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=${totalReal.toFixed(2)}&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar`, '_blank');
            location.reload();
        });
    })
    
    const data = await resp.json()
    // const result = await data.results
    return data;
}

// =================Pegar um dado especifico dos cookies========================

function pegarDadoCookie(cname) {
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

// ====================atualizar/sincronizar dados dos cookies e carrinho=================

function atualizaCarrinho(){
    var carrinhoLista = pegarDadoCookie("lojaLista").split("-");
    if(carrinhoLista[0]!="" || carrinhoLista.length>1) {
        carrinho = carrinhoLista;
    } else {
        document.cookie = 'lojaLista=0';
    }
}


// ===========================Mostrar dados do 'boleto' na pagina==================
async function imprimirDados() {
    totalReal = 0;
    totalDolar = 0;
    loja = await produtosLoja();
    atualizaCarrinho();
    if(carrinho.length<=1) {
        alert("adicione items ao carrinho primeiro!!")
        window.location = ('loja.html');

    } else {
        document.querySelector("#itensBoleto").innerHTML = "";
        for(let x=0; x<loja.length; x++) {
            var valor = 52.48;
            if(loja[x].price!=null) {
                valor = loja[x].price;
                // valor = valor.toFixed(2);
            }
            var achou = false;
            for(let y=0; y<carrinho.length; y++) {
                if(parseInt(carrinho[y])==loja[x].id){
                    achou = true;
                    break;
                }
            }
            if(achou) {
                totalReal += parseFloat(loja[x].price)*5.25;
                totalDolar += parseFloat(loja[x].price);
                document.querySelector("#itensBoleto").innerHTML += `
                    <div class="cartaoProduto">
                        <img src="${loja[x].image}" alt="${loja[x].name}">
                        <div class="dadosItemCarrinho">
                            <p>${loja[x].name}</p>
                            <p>R$${(parseFloat(loja[x].price)*5.25).toFixed(2)} ou US$${(parseFloat(loja[x].price)).toFixed(2)}</p>
                        </div>
                    </div>
                `
            }
        }
        document.getElementById("conteudoResumo").innerHTML = `
            <div class="grupoDadosResumo">
                <p><strong>Produtos</strong></p>
                <p>${carrinho.length-1} itens</p>
            </div>
            <div class="grupoDadosResumo">
                <p><strong>Frete</strong></p>
                <p style='color: green'><strong>Gratis</strong></p>
            </div>
            <div class="grupoDadosResumo">
                <p><strong>Total Real</strong></p>
                <p>R$${totalReal.toFixed(2)}</p>
            </div>
            <div class="grupoDadosResumo" id="ultimo">
                <p><strong>Total Dolar</strong></p>
                <p>US$${totalDolar.toFixed(2)}</p>
            </div>
            <div id="confirmarCompra"><p>Finalizar</p></div>
        `
    }

    document.querySelector("#confirmarCompra").addEventListener("click", function() {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const diaVencimento = parseInt(dia) + 2;
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const nome = pegarDadoCookie("nome");
        const telefone = pegarDadoCookie("telefone");
        const rua = pegarDadoCookie("rua");
        const bairro = pegarDadoCookie("bairro");
        const numero = pegarDadoCookie("numero");
        const idEstado = pegarDadoCookie("idEstado");
        const estado = pegarDadoCookie("estado");
        const cidade = pegarDadoCookie("cidade");
        document.cookie = 'lojaLista=0';
        window.open(`http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Shueisha&data_documento=${dia}%2F${mes}%2F${ano}&numero_documento=DF+00113&especie=&aceite=N&data_processamento=${dia}%2F${mes}%2F${ano}&uso_banco=&carteira=179&especie_moeda=Real&quantidade=${carrinho.length-1}&valor=&vencimento=${diaVencimento}%2F${mes}%2F${ano}&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=${totalReal.toFixed(2)}&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar`, '_blank');
        location.reload();
        // window.location = (`http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Shueisha&data_documento=${dia}%2F${mes}%2F${ano}&numero_documento=DF+00113&especie=&aceite=N&data_processamento=${dia}%2F${mes}%2F${ano}&uso_banco=&carteira=179&especie_moeda=Real&quantidade=${carrinho.length-1}&valor=&vencimento=${diaVencimento}%2F${mes}%2F${ano}&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=${totalReal.toFixed(2)}&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar`);
    });
}

// =====================Adiciona a classe 'valida' no campo para estilizacao caso campo seja valido ou invalido=================

function validaCampo(e){
    document.getElementById(e.id).classList.add("valida");
}

// ====================Popula o campo select de estado quando for editar, usando API do IBGE==================

async function popularEstadosEditar(idSelecionado) {
    const estadoSelect = document.querySelector("select[name=estado]")
    estadoSelect.innerHTML = "";
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then( estados => {
        for( const estadoEditar of estados ) {
            if(estadoEditar.id==idSelecionado) {
                estadoSelect.innerHTML += `<option value="${estadoEditar.id}" id="${estadoEditar.id}" selected>${estadoEditar.nome}</option>`
            }else{
                estadoSelect.innerHTML += `<option value="${estadoEditar.id}" id="${estadoEditar.id}">${estadoEditar.nome}</option>`
            }
        }
    })
}

// ====================Popula o campo select de cidade quando for editar, usando API do IBGE==================

function populaCidadesEditar(nomeCidade) {
    var estadoSelecionado = document.querySelector("[name=estado]").value;
    const cidadeSelect = document.querySelector("[name=cidade]")
    const campoMensagem = document.getElementById("carregando");
    const botaoEnviar = document.querySelector("[type=submit]")
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

    cidadeSelect.innerHTML = ""
    campoMensagem.style.display = "initial";
    cidadeSelect.disabled = true;
    botaoEnviar.disabled = true;

    fetch(url).then(res => res.json()).then( cidades => {
        for( const cidade of cidades ) {
            if(cidade.nome==nomeCidade) {
                cidadeSelect.innerHTML += `<option value="${cidade.nome}" selected>${cidade.nome}</option>`
            } else {
                cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
            }
        }

        cidadeSelect.disabled = false
        botaoEnviar.disabled = false
        campoMensagem.style.display = "none";
    })
}

// ====================Popula o campo select de estado, usando API do IBGE==================

async function popularEstados() {
    const estadoSelect = document.querySelector("select[name=estado]")
    estadoSelect.innerHTML = "";
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then( estados => {
        for( const estado of estados ) {
            estadoSelect.innerHTML += `<option value="${estado.id}" id="${estado.id}">${estado.nome}</option>`
        }
        populaCidades();
    })
}

// ====================Popula o campo select de cidade, usando API do IBGE==================

function populaCidades() {
    var estadoSelecionado = document.querySelector("[name=estado]").value;
    const cidadeSelect = document.querySelector("[name=cidade]")
    const campoMensagem = document.getElementById("carregando");
    const botaoEnviar = document.querySelector("[type=submit]")
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

    cidadeSelect.innerHTML = ""
    campoMensagem.style.display = "initial";
    cidadeSelect.disabled = true;
    botaoEnviar.disabled = true;

    fetch(url).then(res => res.json()).then( cidades => {
        for( const cidade of cidades ) {
            cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }

        cidadeSelect.disabled = false
        botaoEnviar.disabled = false
        campoMensagem.style.display = "none";
    } )
}

// ====================Preenche campos do formulario de acordo com dados salvos em cookies=======================

async function preencherFormularioEditar() {
    const nome = pegarDadoCookie("nome");
    const telefone = pegarDadoCookie("telefone");
    const rua = pegarDadoCookie("rua");
    const bairro = pegarDadoCookie("bairro");
    const numero = pegarDadoCookie("numero");
    const idEstado = pegarDadoCookie("idEstado");
    const estado = pegarDadoCookie("estado");
    const cidade = pegarDadoCookie("cidade");
    const resp = await popularEstadosEditar(idEstado, cidade);
    setTimeout(() => {
        populaCidadesEditar(cidade);
    }, 1000) 
    document.querySelector("[name=nome]").value = nome;
    document.querySelector("[name=telefone]").value = telefone;
    document.querySelector("[name=rua]").value = rua;
    document.querySelector("[name=bairro]").value = bairro;
    document.querySelector("[name=numero]").value = numero;
}

// =======================adicionando ouvidor de eventos no botao para editar dados de entreg=======================

document.querySelector(".ferramentasEndereco").addEventListener("click", () => {
    document.getElementById("formularioEndereco").style.display = "flex";
    preencherFormularioEditar()
})

// ========================Ouvidor de submit do formulario ===============================
document.querySelector("form").addEventListener("submit", (event) => {
    document.getElementById("formularioEndereco").style.display = "none";
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const rua = document.getElementById("rua").value;
    const bairro = document.getElementById("bairro").value;
    const numero = document.getElementById("numero").value;
    const idEstado = document.getElementById("estado").value;
    const estado = document.getElementById(idEstado).innerText;
    const cidade = document.getElementById("cidade").value;
    document.cookie = `nome=${nome}`;
    document.cookie = `telefone=${telefone}`;
    document.cookie = `rua=${rua}`;
    document.cookie = `bairro=${bairro}`;
    document.cookie = `numero=${numero}`;
    document.cookie = `idEstado=${idEstado}`;
    document.cookie = `estado=${estado}`;
    document.cookie = `cidade=${cidade}`;

    event.preventDefault();

    dadosJaCadastrados()
});

// ================Preenche campos da pagina que estao salvos em cookies=======================

function dadosJaCadastrados() {
    const nome = pegarDadoCookie("nome");
    const telefone = pegarDadoCookie("telefone");
    const rua = pegarDadoCookie("rua");
    const bairro = pegarDadoCookie("bairro");
    const numero = pegarDadoCookie("numero");
    const idEstado = pegarDadoCookie("idEstado");
    const estado = pegarDadoCookie("estado");
    const cidade = pegarDadoCookie("cidade");
    if(nome!="" && telefone!="" && rua!="" && bairro!="" && numero!="" && idEstado!="" && estado!="" && cidade!="") {
        document.querySelector(".dadosEndereco").innerHTML = `
            <p><strong>${rua}, ${bairro}, ${numero}</strong></p>
            <p>${cidade} / ${estado}</p>
            <p>${nome} - ${telefone}</p>
        `;
        imprimirDados()
    } else {
        document.getElementById("formularioEndereco").style.display = "flex";
        popularEstados()
    }
}
dadosJaCadastrados();

document.querySelector("select[name=estado]").addEventListener("change", populaCidades)