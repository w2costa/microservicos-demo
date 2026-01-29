// produtos.js
const express = require('express');
const app = express();
const PORT = 3000;

// Dados simulados (num caso real, viriam de uma Base de Dados)
const listaDeProdutos = [
    { id: 1, nome: 'Notebook Gamer', preco: 1500 },
    { id: 2, nome: 'Teclado Mecânico', preco: 100 },
    { id: 3, nome: 'Monitor 24pol', preco: 250 }
];

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
    console.log('Recebi um pedido de lista de produtos!');
    res.json(listaDeProdutos);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Serviço de Produtos a rodar em http://localhost:${PORT}`);
});