let carrinhoAberto = false; // Variável para controlar o estado do carrinho

function exibirItensCarrinho() {
    var carrinho = localStorage.getItem('carrinho');
    var itensCarrinho = document.getElementById('produtos');
    itensCarrinho.innerHTML = '';

    var mensagemCarrinhoVazio = document.createElement('div');
    mensagemCarrinhoVazio.classList.add('mensagem-carrinho-vazio'); // Adicionando classe para estilização
    mensagemCarrinhoVazio.classList.add('estiloCordegrade'); // Adicionando classe de estilo
    mensagemCarrinhoVazio.classList.add('tituloDestaque'); // Adicionando classe de estilo

    if (!carrinho || JSON.parse(carrinho).length === 0) {
        var mensagem = document.createElement('p');
        mensagem.textContent = 'Carrinho sem itens.';

        var botaoAdicionarProdutos = document.createElement('button');
        botaoAdicionarProdutos.textContent = 'Adicionar Produtos';
        botaoAdicionarProdutos.classList.add('estiloBotao');
        botaoAdicionarProdutos.addEventListener('click', function() {
            window.location.href = './produto.html'; // Substitua 'pagina_produtos.html' pelo link correto
        });

        mensagemCarrinhoVazio.appendChild(mensagem);
        mensagemCarrinhoVazio.appendChild(botaoAdicionarProdutos);
        itensCarrinho.appendChild(mensagemCarrinhoVazio);
        return;
    }else if (carrinho) {
      carrinho = JSON.parse(carrinho);
      console.log(carrinho);
  
      var total = 0; // Inicializa o valor total como zero
  
      // Criando a tabela
      var tabela = document.createElement('table');
      tabela.classList.add('table');
  
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
  
      // Cabeçalhos da tabela
      var headers = ['Produto', 'Nome', 'Valor']; // Adicionando cabeçalhos específicos
      headers.forEach(headerText => {
        var th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
  
      thead.appendChild(headerRow);
      tabela.appendChild(thead);
  
      var tbody = document.createElement('tbody');
  
      // Adicionando linhas com os itens do carrinho
      carrinho.forEach(item => {
        var row = document.createElement('tr');
  
        var imgCell = document.createElement('td');
        var img = document.createElement('img');
        img.src = `${item.url_img}`;
        img.alt = `${item.produto}`;
        img.style.width = '60px';
        img.style.marginTop = '12px';
        imgCell.appendChild(img);
  
        var productNameCell = document.createElement('td');
        productNameCell.textContent = item.produto;
  
        var priceCell = document.createElement('td');
        priceCell.textContent = `$${item.preco}`;
  
        total += parseFloat(item.preco); // Adiciona o preço do item ao valor total
  
        row.appendChild(imgCell);
        row.appendChild(productNameCell);
        row.appendChild(priceCell);
  
        tbody.appendChild(row);
      });
  
      // Adicionando linha extra para o valor total
      var totalRow = document.createElement('tr');
      var totalCell = document.createElement('td');
      totalCell.setAttribute('colspan', '2'); // Colspan para ocupar duas colunas
      totalCell.textContent = 'Valor Total:';
      totalRow.appendChild(totalCell);
  
      var totalValueCell = document.createElement('td');
      totalValueCell.textContent = `$${total.toFixed(2)}`;
      totalRow.appendChild(totalValueCell);
  
      tbody.appendChild(totalRow);
  
      tabela.appendChild(tbody);
  
      // Adiciona a tabela à div com id "produtos"
      itensCarrinho.appendChild(tabela);
    }
  }
  
  
  
  

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  exibirItensCarrinho();
}


// Exibe os itens do carrinho ao carregar a página
window.onload = function() {
  exibirItensCarrinho();
};
