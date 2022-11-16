
const listUl = document.querySelector("#listaPrincipal")

// Geração Dos Produtos
for (let i = 0; i < data.length; i++) {
    
    let dataId = data[i].id;
    let dataImg = data[i].img;
    let tipo = data[i].tag[0];
    let nomeItem = data[i].nameItem;
    let description = data[i].description;
    let preco = data[i].value;
    
    let listItem = document.createElement('li');
    listItem.classList.add('card')
    listItem.innerHTML = ""
    listItem.id = dataId
    
    let img = document.createElement('img');
    img.src = dataImg
    
    let pTipo = document.createElement('p');
    pTipo.classList.add('type');
    pTipo.innerText = tipo
    
    let h3 = document.createElement('h3');
    h3.innerText = nomeItem
    
    let pDescription = document.createElement('p');
    pDescription.classList.add('descricao')
    pDescription.innerText = description;
    
    let pPreco = document.createElement('p')
    pPreco.classList.add('preco')
    pPreco.innerText = `R$${preco},00`
    
    let buttonAdd = document.createElement('button');
    buttonAdd.classList.add('botao')
    buttonAdd.setAttribute('id', `b_${dataId}`)
    buttonAdd.innerText = 'Adicionar ao carrinho';
    
    listItem.appendChild(img);
    listItem.appendChild(pTipo);
    listItem.appendChild(h3);
    listItem.appendChild(pDescription);
    listItem.appendChild(pPreco);
    listItem.appendChild(buttonAdd);
    listUl.appendChild(listItem)
}

// Processo de por os itens no carrinho

const listaSelecionados = document.querySelector('#listaCompras')
const botoesAdd = document.querySelectorAll('.botao')

let selecionados = [];
let itensNaLista = [];

function loadList(){
    if(quantia <= 0){
        listaSelecionados.innerHTML = ""
        carroVazio()
    }else{
        listaSelecionados.innerHTML = ""

    }
    
    for (let l = 0; l < selecionados.length; l++) {
        let currentElement = selecionados[l];
        currentElement.id = l;
        listaSelecionados.appendChild(currentElement);
    }
}

function removeButton(){
    listaSelecionados.innerHTML = ""
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', (e) => {

        let itemId = selecionados.filter((_, index) => index === Number(e.path[2].id));
        itemId = itemId[0].id
        
        itensNaLista.splice(itemId,1)
        contaFinal = 0

        for (let d = 0; d < itensNaLista.length; d++) {
            let item = itensNaLista[d];
            contaFinal += item.value
        }
        spanPreco.innerText = `R$${contaFinal},00`

        quantia -= 1 
        spanQuantdTotal.innerText = `${quantia}`

        if(quantia <= 0){
            divTotalPago.classList.remove('totalPagar')
            divTotalPago.innerHTML = ""
        }

        selecionados = selecionados.filter((_, index) => index !== Number(e.path[2].id));
        loadList()
    });
    removeButton.innerText = 'Remover produto'
    removeButton.classList.add('remover')
    return removeButton
}

let divTotalPago = document.createElement('div');

let p1 = document.createElement('p');

    let spanQuantd = document.createElement('span');
    spanQuantd.innerText = 'Quantidade';

    let spanQuantdTotal = document.createElement('span')
    spanQuantdTotal.innerText = ""

    p1.append(spanQuantd, spanQuantdTotal)

let p2 = document.createElement('p');

    let spanTotal = document.createElement('span');
    spanTotal.innerText = 'Total'
    
    let spanPreco = document.createElement('span');
    spanPreco.innerText = ""

    p2.append(spanTotal, spanPreco)

divTotalPago.append(p1,p2);


let contaFinal = 0;
let quantia = 0

for (let z = 0; z < botoesAdd.length; z++) {
    let botao = botoesAdd[z]
    
    botao.addEventListener('click', (e) => {
        
        listaSelecionados.classList.replace('listaSelecionados', 'listaComItens')
        
        let dataPosicao = data[z]

        quantia += 1
        spanQuantdTotal.innerText = `${quantia}`
        if(quantia !== 0){
            carroComItens()
        }

        contaFinal += data[z].value
        spanPreco.innerText = `R$${contaFinal},00`

        
        let newItem = document.createElement("li");
        
        let imgCarrinho = document.createElement('img');
        imgCarrinho.src = dataPosicao.img;
        newItem.appendChild(imgCarrinho)
        
        let divItemCarrinho = document.createElement('div');
        divItemCarrinho.classList.add('carrinhoItem')
        
        let h3Item = document.createElement('h3');
        h3Item.innerText = dataPosicao.nameItem
        divItemCarrinho.appendChild(h3Item);
        
        let pCarrinho = document.createElement("p");
        pCarrinho.innerText = `R$${dataPosicao.value},00`;
        divItemCarrinho.appendChild(pCarrinho)
        
        let removerButton = removeButton();
        divItemCarrinho.appendChild(removerButton)
    
        newItem.appendChild(divItemCarrinho)
        selecionados.push(newItem);
        itensNaLista.push(data[z])
        loadList();
    })
    
}

function carroVazio(){

    listaSelecionados.classList.replace('listaComItens','listaSelecionados')

    let element = document.createElement('h3')
    element.innerText = 'Carrinho Vazio';
    element.setAttribute('id', 'carrinhoVazio')

    let small = document.createElement('small');
    small.innerText = 'Adicione itens';
    small.setAttribute('id', 'small');

    listaSelecionados.appendChild(element)
    listaSelecionados.appendChild(small)
}

function carroComItens(){
    divTotalPago.classList.add('totalPagar')
    divTotalPago.append(p1,p2);
    let carrinho = document.querySelector('.carrinho')
    carrinho.appendChild(divTotalPago)
}