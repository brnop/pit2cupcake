
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, update, onValue, child, get, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getDatabase(app)
const storage = getStorage(app);

const dbRef = ref(db, 'editar')
const dbRefEd = ref(db, 'catalogo')


onValue(dbRef, (snapshot) => {
    const n = snapshot.size - 1
    const lista = []
    snapshot.forEach((pedidos) => {
        const codigo = pedidos.key
        lista.push(codigo)
    })

    const c = (lista[n])
    //alert(c)

    get(child(dbRefEd, `/${c}`)).then((snapshot) => {
        if (snapshot.exists()) {
            document.querySelector('input[id="produto"]').value = snapshot.val().produto
            document.querySelector('input[id="valor"]').value = snapshot.val().valor
            document.querySelector("#descricao").value = snapshot.val().descricao
            document.querySelector("#img").value = snapshot.val().imagem
        } else {
            console.log("Não encontrado");
        }
    }).catch((error) => {
        console.error(error);
    });

    document.querySelector('#btn-salva_alteracao').addEventListener('click', () => {
        const n = document.querySelector('#produto').value
        const v = document.querySelector('#valor').value
        const d = document.querySelector('#descricao').value
        const i = document.querySelector("#img").value

        const file = document.querySelector("#file-input").files[0]
        if (typeof file === "undefined") {
            // a variável é undefined
            console.log('a variável i está vazia')

            // Registra um novo produto.
            update(child(dbRefEd, `/${c}`), {
                produto: n,
                valor: v,
                descricao: d,
                imagem: i,                
                
            })
                .then(() => {

                    remove(dbRef, `/${c}`)
                    window.location.href = './catalogo.html';
                })
                .catch(() => {
                    // Ocorreu um erro.
                    console.log('Erro ao registrar');
                })

        } else {
            // a variável não é undefined
            console.log('a variável i não está vazia')
            const i = document.querySelector("#file-input").files[0].name
            const storageRef = refstor(storage, `imagens/${file.name}`);

            uploadBytes(storageRef, file).then((snapshot) => {

                console.log('Imagem enviada com sucesso!')

                getDownloadURL(storageRef).then((url) => {

                    // Registra um novo produto.
                    update(child(dbRefEd, `/${c}`), {
                        produto: n,
                        valor: v,
                        imagem: i,
                        descricao: d,
                        url_img: url
                    })
                        .then(() => {

                            remove(dbRef, `/${c}`)

                            console.log('Registrado com sucesso!');
                            window.location.href = '../View/catalogo.html';
                        })
                        .catch(() => {
                            // Ocorreu um erro.
                            console.log('Erro ao registrar');
                        })
                })
            })
        }

    })
})


















