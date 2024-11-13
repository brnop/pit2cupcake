import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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



// Adiciona um manipulador de evento ao botão de login.
document.querySelector('#btn-encomenda').addEventListener('click', () => {
    // Obtém o conteúdo da div com o ID "produtos"
    const produtosElement = document.querySelector('#produtos');

    if (produtosElement) {
        const tabelaProdutos = produtosElement.querySelector('table');
      
        if (tabelaProdutos) {
            const conteudoProdutos = produtosElement.innerHTML;
            document.querySelector('#mensagem').value += conteudoProdutos;
            console.log('Elemento "#produtos" encontrado e contém uma tabela.');
        } else {
            console.log('Elemento "#produtos" encontrado, mas não contém uma tabela.');
        }
    } else {
        console.log('Elemento "#produtos" não encontrado.');
    }
    // remover item do carrinho
    localStorage.removeItem('carrinho');
    // Obter os dados do formulário
    const nome = document.querySelector('#nome').value;
    const contato = document.querySelector('#contato').value;
    const assunto = document.querySelector('#assunto').value;
    const mensagem = document.querySelector('#mensagem').value;
    const endereco = document.querySelector('#endereco').value;
    const dataEntrega = document.querySelector('#data').value; // Novo campo de data
    const novoID = Math.floor(Math.random() * 1000000); // Gera um número aleatório de 0 a 999999


    // Enviar os dados para o Firebase
    push(ref(db, 'encomendas/'), {
        id: novoID,
        nome: nome,
        contato: contato,
        assunto: assunto,
        mensagem: mensagem,
        endereco: endereco,
        dataEntrega: dataEntrega // Adicionando o campo de data à encomenda
    })
    .then(() => {
        // Encomenda registrada com sucesso.
        console.log('Registrado com sucesso!');
        location.reload();
    })
    .catch(() => {
        // Ocorreu um erro ao tentar registrar a encomenda.
        console.log('Erro ao registrar');
    });
});
