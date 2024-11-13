import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getStorage, ref as refstor, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {

        apiKey: "AIzaSyDP7xB_vV7rNMrq6cls_Uw18bBbaER19EQ",
        authDomain: "estrelar-cupcakes.firebaseapp.com",
        projectId: "estrelar-cupcakes",
        storageBucket: "estrelar-cupcakes.appspot.com",
        messagingSenderId: "934132448331",
        appId: "1:934132448331:web:328dd90fd98dceaec1e1ce",
        measurementId: "G-99SXGKBR65"

};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);

document.querySelector('#upload-button').addEventListener('click', () => {
  const file = document.querySelector("#file-input").files[0];
  const nome = document.querySelector('#nome').value;
  const valor = document.querySelector('#valor').value;
  const descricao = document.querySelector('#descricao').value;

  const storageRef = refstor(storage, `imagens/${file.name}`);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Imagem enviada com sucesso!');

    getDownloadURL(storageRef).then((url) => {
      // Registra um novo produto.
      push(ref(db, 'catalogo/'), {
        produto: nome,
        valor: valor,
        imagem: file.name, // Nome do arquivo local da imagem
        url_img: url, // URL obtida após o upload
        descricao: descricao,
      }).then(() => {
        console.log('Produto registrado com sucesso!');
        window.location.href = './novoproduto.html';
      }).catch((error) => {
        console.error('Erro ao registrar:', error);
      });
    }).catch((error) => {
      console.error('Erro ao obter a URL da imagem:', error);
    });
  }).catch((error) => {
    console.error('Erro ao enviar a imagem:', error);
  });
});