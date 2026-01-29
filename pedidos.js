// pedidos.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://produtos-app:3000/produtos';

app.get('/criar-pedido', async (req, res) => {
    let produtoSelecionado;
    let observacao = '';

    try {
        console.log('A tentar contactar o serviço de produtos...');
        // Definimos um timeout curto (1 segundo). Se demorar mais, desistimos.
        const resposta = await axios.get(PRODUCT_SERVICE_URL, { timeout: 1000 });
        
        const infoDoServico = resposta.data;
        produtoSelecionado = infoDoServico.dados[0];
        observacao = `Atendido por: ${infoDoServico.quem_respondeu}`;

    } catch (erro) {
        console.warn('O Serviço de Produtos está indisponível! Usando Fallback.');
        
        // --- AQUI ENTRA O FALLBACK ---
        // Em vez de crashar, usamos um produto "default"
        produtoSelecionado = {
            id: 0,
            nome: "Produto Genérico (Sistema em Manutenção)",
            preco: 0
        };
        observacao = "Modo de Segurança ativado. Detalhes indisponíveis no momento.";
        // -----------------------------
    }

    // O código continua normalmente, mesmo com o erro lá em cima
    const novoPedido = {
        idPedido: 999,
        cliente: 'João Silva',
        produtoComprado: produtoSelecionado,
        status: observacao,
        data: new Date()
    };

    res.json({
        mensagem: 'Pedido processado.',
        pedido: novoPedido
    });
});

app.listen(PORT, () => {
    console.log(`Serviço de Pedidos a rodar em http://localhost:${PORT}`);
});