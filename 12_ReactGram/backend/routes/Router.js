const express = require('express');
const router = express();


// Rota de teste
router.get('/', (req, res) => {
    res.send('Essa API está rodando...');
});





module.exports = router; // Exporta o router para ser utilizado em outros arquivos