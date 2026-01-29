// pedidos.js
const express = require('express');
const axios = require('axios'); // Biblioteca para fazer requisições HTTP
const app = express();
const PORT = 3001;

// URL do Serviço de Produtos (onde ele está a rodar)
// ANTES:
// const PRODUCT_SERVICE_URL = 'http://localhost:3000/produtos';

// DEPOIS (Usando variável de ambiente ou nome do contentor):
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://produtos-app:3000/produtos';

app.get('/criar-pedido', async (req, res) => {
    try {
        // 1. O Serviço de Pedidos chama o Serviço de Produtos
        console.log('A contactar o serviço de produtos...');
        const resposta = await axios.get(PRODUCT_SERVICE_URL);
        const produtos = resposta.data;

        // 2. Simulamos a criação de um pedido com o primeiro produto da lista
        const novoPedido = {
            idPedido: 999,
            cliente: 'João Silva',
            produtoComprado: produtos[0], // Pegámos o 'Notebook Gamer' do outro serviço
            data: new Date()
        };

        // 3. Devolvemos o pedido completo ao utilizador
        res.json({
            mensagem: 'Pedido criado com sucesso através da comunicação entre microserviços!',
            pedido: novoPedido
        });

    } catch (erro) {
        console.error('Erro ao comunicar com o serviço de produtos:', erro.message);
        res.status(500).json({ erro: 'Não foi possível aceder ao catálogo de produtos.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serviço de Pedidos a rodar em http://localhost:${PORT}`);
});