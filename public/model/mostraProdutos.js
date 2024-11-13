import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP7xB_vV7rNMrq6cls_Uw18bBbaER19EQ",
  authDomain: "estrelar-cupcakes.firebaseapp.com",
  projectId: "estrelar-cupcakes",
  storageBucket: "estrelar-cupcakes.appspot.com",
  messagingSenderId: "934132448331",
  appId: "1:934132448331:web:328dd90fd98dceaec1e1ce",
  measurementId: "G-99SXGKBR65"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const dbRef = ref(db, 'catalogo');


const lista = document.querySelector('#catalogo')


onValue(dbRef, (snapshot) => {
  lista.innerHTML = ''


  snapshot.forEach((catalogo) => {

    const dados = catalogo.val();

    const card = `  
        <div class="card">       
          <img src="${dados.url_img}" class="card-img-top">
          <div class="">
            <h2 class="tituloProduto">${dados.produto}</h2>
            <div class="card-body">
              <h5 class="card-title">Preço R$${dados.valor} a unidade</h5>
              <p class="card-text"></p>
            </div>
            <div class="card-footer">
              <form class="d-block">
                <button onclick="adicionarAoCarrinho('${dados.produto}', ${dados.valor}, '${dados.url_img}')" type="button" class="btn estiloBotao" data-toggle="modal" data-target="#exampleModalCenter" name="${catalogo.key}">
                  Adicionar ao carrinho
                </button>
              </form>
              <br>
            </div>
          </div>
        </div>
   `


    const div = document.createElement('div')
    div.setAttribute('class', 'col-lg-4')
    div.innerHTML = card
    lista.appendChild(div)

  })
})

// Função para buscar e exibir os resultados da pesquisa
function buscarProdutos(termoPesquisa) {
  onValue(dbRef, (snapshot) => {
    lista.innerHTML = '';

    snapshot.forEach((catalogo) => {
      const dados = catalogo.val();
      const nomeProduto = dados.produto.toLowerCase();

      if (nomeProduto.includes(termoPesquisa.toLowerCase())) {
        const card = `  
        <div class="card">       
        <img src="${dados.url_img}" class="card-img-top">
        <div class="">
          <h2 class="tituloProduto">${dados.produto}</h2>
          <div class="card-body">
            <h5 class="card-title">Preço R$${dados.valor} a unidade</h5>
            <p class="card-text"></p>
          </div>
          <div class="card-footer">
            <form class="d-block">
              <button onclick="adicionarAoCarrinho('${dados.produto}', ${dados.valor}, '${dados.url_img}')" type="button" class="btn estiloBotao" data-toggle="modal" data-target="#exampleModalCenter" name="${catalogo.key}">
                Adicionar ao carrinho
              </button>
            </form>
            <br>
          </div>
        </div>
      </div>`;

        const div = document.createElement('div');
        div.setAttribute('class', 'col-lg-4');
        div.innerHTML = card;
        lista.appendChild(div);
      }
    });
  });
}

// Adiciona um evento de escuta para a barra de pesquisa
const barraDePesquisa = document.getElementById('barraDePesquisa');
barraDePesquisa.addEventListener('input', () => {
  const termoPesquisa = barraDePesquisa.value;
  buscarProdutos(termoPesquisa);
});