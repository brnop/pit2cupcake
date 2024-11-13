// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
const auth = getAuth(app);


// Adiciona um manipulador de evento ao botão de login.
document.querySelector('#botao').addEventListener('click', () => {
    // Obtem o e-mail e a senha do usuário.
    const email = document.querySelector('#Usuario').value;
    const password = document.querySelector('#Senha').value;

    // Tenta logar o usuário.
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // O usuário foi logado com sucesso.
            alert("Logado com sucesso!");
            window.location.href = '/View/pages/pedidos.html';
        })
        .catch((error) => {
            // Ocorreu um erro ao tentar logar o usuário.
            alert("Erro ao logar");
        });
});