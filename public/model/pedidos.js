import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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

const dbRef = ref(db, 'encomendas');


const barraDePesquisa = document.getElementById('suaBarraDePesquisa'); // Substitua "suaBarraDePesquisa" pelo ID correto da sua barra de pesquisa
const listaPedidos = document.querySelector('.lista_pedidos'); // Substitua ".lista_pedidos" pela classe correta da sua lista de pedidos


let pedidos = []; // Array para armazenar os pedidos originais

// Função para renderizar os pedidos na página
function renderizarPedidos(pedidosParaRenderizar) {
    listaPedidos.innerHTML = ''; // Limpa a lista de pedidos

    pedidosParaRenderizar.forEach((pedido) => {
        const card = `
            <tr>
                <td>#00${pedido.id}</td>
                <td>${pedido.nome}</td>
                <td>${pedido.contato}</td>
                <td>${pedido.endereco}</td>
                <td>${pedido.mensagem}</td>
                <td>${pedido.dataEntrega}</td>
            </tr>`;

        listaPedidos.insertAdjacentHTML('beforeend', card);
    });

    // Adiciona um ouvinte de evento aos botões "Excluir"
    document.querySelectorAll('.btn-excluir').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const pedidoId = event.target.dataset.pedidoId;
            // Aqui você pode chamar a função para excluir o pedido com o ID "pedidoId" do banco de dados
            // ...
            console.log(`Pedido ${pedidoId} excluído`);
        });
    });
}

// Obtém os pedidos do banco de dados Firebase
onValue(dbRef, (snapshot) => {
    pedidos = []; // Limpa o array de pedidos

    snapshot.forEach((pedido) => {
        const dadosPedido = pedido.val();
        let codigo = 156; // Inicialize o código aqui ou calcule conforme sua lógica

        // Adiciona os dados do pedido ao array de pedidos
        pedidos.push({
            id: dadosPedido.id,
            nome: dadosPedido.nome,
            contato: dadosPedido.contato,
            endereco: dadosPedido.endereco,
            mensagem: dadosPedido.mensagem,
            dataEntrega: dadosPedido.dataEntrega
        });
    });

    renderizarPedidos(pedidos); // Renderiza os pedidos na página
});

// Adiciona um ouvinte de evento à barra de pesquisa para filtrar os pedidos
barraDePesquisa.addEventListener('input', () => {
    const termoPesquisa = barraDePesquisa.value.toLowerCase();

    const pedidosFiltrados = pedidos.filter((pedido) =>
        Object.values(pedido).some((valor) =>
            valor.toString().toLowerCase().includes(termoPesquisa)
        )
    );

    renderizarPedidos(pedidosFiltrados); // Renderiza os pedidos filtrados na página
});

// Seu código existente do Firebase...

// Função para excluir todos os pedidos do banco de dados
function excluirTodosPedidos() {
    const confirmacao = confirm("Tem certeza de que deseja excluir todos os pedidos? Esta ação é irreversível!");

    if (confirmacao) {
        const encomendasRef = ref(db, '/encomendas');

        // Remove todos os pedidos do banco de dados sob a referência "encomendas"
        set(encomendasRef, null)
            .then(() => {
                console.log('Todos os pedidos foram excluídos com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao excluir os pedidos:', error);
            });
    }
}

// Adiciona um manipulador de evento ao botão "botaoExcluirTodos"
document.querySelector('#botaoExcluirTodos').addEventListener('click', excluirTodosPedidos);

// Seu código existente para enviar os dados para o Firebase...