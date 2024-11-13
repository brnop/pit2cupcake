
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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

 // Menu carrinho.
document.querySelector('#btn-proximo').addEventListener('click', () => {
    const total = document.getElementById("total");
    const texto = total.innerText

    const items = document.querySelectorAll('ul[id="lista-carrinho"]');

    const carrinho = []
    for (const item of items) {
        carrinho.push(item.innerText);

    }
  
    push(ref(db, 'carrinho/'), {
        pedido: carrinho,
        total: texto

    })
        .then(() => {
            // Encomenda registra.
            window.location.href = '../View/testeformcorp.html';
        })
        .catch(() => {
            // Ocorreu um erro ao tentar registra.
            alert('Erro ao registrar');
        });
});


