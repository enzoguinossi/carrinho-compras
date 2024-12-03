const produtoSelect = document.getElementById('produto');
let produtoSelecionado = produtoSelect.value;
document.getElementById('quantidade').value = 1;

produtoSelect.addEventListener('change', function() {
    produtoSelecionado = produtoSelect.value;
    console.log(`Produto selecionado: ${produtoSelecionado.split(" - ")[0]}`);
});

const carrinhoUsuario = []; // Array para os produtos guardados no carrinho.

function adicionar() {
    const quantidadeDesejada = parseInt(document.getElementById('quantidade').value);
    const precoProduto = produtoSelecionado.split(" - ")[1].replace('R$', '').trim(); // Remove o 'R$' e o espaço extra
    const nomeProduto = produtoSelecionado.split(" - ")[0]; // Nome do produto

    if (!isNaN(quantidadeDesejada) && quantidadeDesejada > 0) {
        // Verifica se o produto já foi adicionado ao carrinho
        const produtoExistente = carrinhoUsuario.find(produto => produto.nome === nomeProduto);

        if (produtoExistente) {
            // Se o produto já existe, apenas aumenta a quantidade
            produtoExistente.quantidade += quantidadeDesejada;
        } else {
            // Se não existe, adiciona o produto ao carrinho com a quantidade inicial
            carrinhoUsuario.push({ nome: nomeProduto, preco: precoProduto, quantidade: quantidadeDesejada });
        }

        console.log(`${quantidadeDesejada} ${nomeProduto}(s) adicionados ao carrinho!`);
    } else {
        console.error('Por favor, insira uma quantidade válida!');
    }
    atualizarCarrinho(); // Atualiza a exibição do carrinho após adicionar o produto
    document.getElementById('quantidade').value = 1; // Atualiza o campo de quantidade
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const listaProdutos = document.getElementById('lista-produtos');
    const valorTotal = document.getElementById('valor-total');

    listaProdutos.innerHTML = ''; // Limpa a lista de produtos

    let total = 0;

    // Percorre o carrinho e exibe cada item
    carrinhoUsuario.forEach(produto => {
        const produtoElement = document.createElement('section');
        produtoElement.classList.add('carrinho__produtos__produto');
        produtoElement.innerHTML = `<span class="texto-azul">${produto.quantidade}x</span> ${produto.nome} <span class="texto-azul">R$${produto.preco}</span>`;
        listaProdutos.appendChild(produtoElement);

        // Calcula o total
        total += parseFloat(produto.preco) * produto.quantidade;
    });

    valorTotal.textContent = `R$${total.toFixed(2)}`; // Exibe o valor total no carrinho
}

// Função para limpar o carrinho
function limpar() {
    console.log('Limpando o carrinho!');
    carrinhoUsuario.length = 0; // Limpa o carrinho
    atualizarCarrinho(); // Atualiza a exibição do carrinho
}
