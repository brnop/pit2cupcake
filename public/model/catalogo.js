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
    console.log(dados)

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
                <button type="button" class="btn estiloBotao" data-toggle="modal" data-target="#exampleModalCenter" name="${catalogo.key}">
                  REMOVER
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="divue">
                  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div class="modal-content estiloBaclgroundOpacidade  tituloProduto">
                      <div class="modal-body">
                        <p style="color: #EBEBEB!important;">Tem certeza que <br> deseja remover esse <br> item?</p>
                        <br>
                        <button type="button" class="bt btn estiloBotao "  data-dismiss="modal">NÃO</button>
                        <button type="button" class="bt btn estiloBotao"  id="sim">SIM</button>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="./editarproduto.html" class="btn estiloBotao " id="btn-editar" name="${catalogo.key}">EDITAR</a>
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

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      var rash = event.target.name

      document.querySelector('#sim').addEventListener('click', () => {
        console.log(rash);

        const refcat = ref(db, `catalogo/${rash}`);
        remove(refcat).then(() => {

          console.log('Excluido com sucesso!');
          window.location.href = './catalogo.html';
        })
          .catch(() => {
            // Ocorreu um erro.
            console.log('Erro ao excluir');
          })

      })

    })


  }, {})

  const a = document.querySelectorAll("#btn-editar");

  a.forEach((as) => {
    as.addEventListener("click", (event) => {
      var rash = event.target.name
 
      set(ref(db, `editar/${rash}`), {
        rash: rash

      })
    })


  }, {})


})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})



