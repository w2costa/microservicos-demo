// produtos.js
const express = require('express');
const os = require('os'); // <--- ADICIONAR ISTO
const app = express();
const PORT = 3000;

const listaDeProdutos = [
    { id: 1, nome: 'Notebook Gamer', preco: 1500 },
    { id: 2, nome: 'Teclado Mecânico', preco: 100 },
    { id: 3, nome: 'Monitor 24pol', preco: 250 }
];

app.get('/produtos', (req, res) => {
    console.log('Recebi um pedido!');
    
    // Vamos devolver também quem atendeu o pedido
    res.json({
        quem_respondeu: os.hostname(), // <--- O NOME DO POD
        dados: listaDeProdutos
    });
});

app.listen(PORT, () => {
    console.log(`Serviço de Produtos a rodar em http://localhost:${PORT}`);
});