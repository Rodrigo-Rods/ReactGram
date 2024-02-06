const express = require('express');
const router = express();

router.use("/api/users", require("./UserRouters"));

// Rota de teste
router.get('/', (req, res) => {
    res.send('API rodando...');
});

module.exports = router; // Exporta o router para ser utilizado em outros arquivos