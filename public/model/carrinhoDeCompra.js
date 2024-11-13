let carrinhoAberto = false; // Variável para controlar o estado do carrinho

// Função para exibir a mensagem
function mostrarMensagem(mensagem) {
  var mensagemElement = document.getElementById('mensagem');
  mensagemElement.innerText = mensagem;
  mensagemElement.style.display = 'block';
  mensagemElement.classList.add('estiloBotao');

  // Desaparece a mensagem após 3 segundos
  setTimeout(function() {
    mensagemElement.style.display = 'none';
  }, 3000);
}

// Função para abrir o carrinho
function abrirCarrinho() {
  var carrinho = document.getElementById('carrinho');
  var cartIcon = document.querySelector('.cart-icon');

  carrinho.classList.add('open');
  cartIcon.classList.add('open');

  carrinhoAberto = true; // Atualiza o estado do carrinho
}

// Função para fechar o carrinho
function fecharCarrinho() {
  var carrinho = document.getElementById('carrinho');
  var cartIcon = document.querySelector('.cart-icon');

  carrinho.classList.remove('open');
  cartIcon.classList.remove('open');

  carrinhoAberto = false; // Atualiza o estado do carrinho
}

function adicionarAoCarrinho(produto, preco, url_img) {
  var carrinho = localStorage.getItem('carrinho');

  if (!carrinho) {
    carrinho = [];
  } else {
    carrinho = JSON.parse(carrinho);
  }

  carrinho.push({ produto, preco, url_img });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  exibirItensCarrinho();

  // Verifica se o carrinho não está aberto e o abre ao adicionar um item
  if (!carrinhoAberto) {
    abrirCarrinho();
  }

  // Mostra a mensagem quando um item é adicionado ao carrinho
  mostrarMensagem('Produto adicionado ao carrinho com sucesso!');
}
function calcularTotalCarrinho() {
  var carrinho = localStorage.getItem('carrinho');
  var total = 0;

  if (carrinho) {
    carrinho = JSON.parse(carrinho);
    carrinho.forEach(item => {
      total += parseFloat(item.preco);
    });
  }

  return total.toFixed(2);
}



function exibirItensCarrinho() {
  var carrinho = localStorage.getItem('carrinho');
  var itensCarrinho = document.getElementById('itens-carrinho');
  var totalCarrinho = document.getElementById('total-carrinho');
  
  // Limpa o conteúdo dos elementos
  itensCarrinho.innerHTML = '';
  totalCarrinho.innerHTML = '';

  if (carrinho) {
    carrinho = JSON.parse(carrinho);
    carrinho.forEach((item, index) => {
      var li = document.createElement('li');

      var img = document.createElement('img');
      img.src = `${item.url_img}`;
      img.alt = `${item.produto}`;
      img.style.width = '50px';
      li.appendChild(img);

      var p = document.createElement('p');
      p.classList.add('estiloCordegrade', 'font-weight-bold');
      p.innerText = `${item.produto}`;

      var precoTexto = document.createTextNode(` - $${item.preco}`);
      p.appendChild(precoTexto);

      // Ícone "X" para remover o item
      var iconRemover = document.createElement('i');
      iconRemover.classList.add('fas', 'fa-times', 'estiloCordegrade');
      iconRemover.style.cursor = 'pointer';
      iconRemover.addEventListener('click', function() {
        removerDoCarrinho(index);
      });

      li.appendChild(p);
      li.appendChild(iconRemover);
      itensCarrinho.appendChild(li);
    });
  }

  var h5Total = document.createElement('h5');
  h5Total.classList.add('estiloCordegrade', 'font-weight-bold');
  h5Total.innerText = `Total: $${calcularTotalCarrinho()}`;

  totalCarrinho.appendChild(h5Total);
}



// Restante do seu código para remover itens do carrinho...


// Função para remover um item do carrinho
function removerDoCarrinho(index) {
  var carrinho = localStorage.getItem('carrinho');
  if (carrinho) {
    carrinho = JSON.parse(carrinho);
    carrinho.splice(index, 1); // Remove o item do array
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirItensCarrinho(); // Atualiza a exibição do carrinho após a remoção
  }
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  var totalCarrinho = document.getElementById('total-carrinho');
  totalCarrinho.innerHTML = ''; // Limpa o conteúdo do elemento totalCarrinho
  exibirItensCarrinho();
}

// Função para abrir e fechar o carrinho
function toggleCarrinho() {
  if (carrinhoAberto) {
    fecharCarrinho();
  } else {
    abrirCarrinho();
  }
}

// Exibe os itens do carrinho ao carregar a página
window.onload = function() {
  exibirItensCarrinho();
};
