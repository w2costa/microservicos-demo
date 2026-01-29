// pedidos.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://produtos-app:3000/produtos';

app.get('/criar-pedido', async (req, res) => {
    try {
        console.log('A contactar o serviço de produtos...');
        const resposta = await axios.get(PRODUCT_SERVICE_URL);
        
        // --- CORREÇÃO AQUI ---
        // O serviço de produtos agora devolve { quem_respondeu: '...', dados: [...] }
        const infoDoServico = resposta.data; 
        const produtos = infoDoServico.dados; // Extraímos a lista da propriedade 'dados'
        const podQueAtendeu = infoDoServico.quem_respondeu; // Extraímos o nome do pod
        // ---------------------

        const novoPedido = {
            idPedido: 999,
            cliente: 'João Silva',
            produtoComprado: produtos[0], 
            atendidoPor: podQueAtendeu, // Adicionamos esta informação ao pedido final
            data: new Date()
        };

        res.json({
            mensagem: 'Pedido criado com sucesso!',
            pedido: novoPedido
        });

    } catch (erro) {
        console.error('Erro:', erro.message);
        res.status(500).json({ erro: 'Erro ao comunicar com o serviço de produtos.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serviço de Pedidos a rodar em http://localhost:${PORT}`);
});