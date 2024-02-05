require("dotenv").config(); // Carrega as variáveis de ambiente
const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 5000; // Define a porta do servidor

const app = express();

// Configuração JSON e Form data
app.use(express.json()); // Permite que o express entenda JSON
app.use(express.urlencoded({ extended: false })); // Permite que o express entenda Form Data

// Configuração do CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Diretório de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Conecção com Banco de Dados
require("./config/db.js");


// Routes
const router = require('./routes/Router'); // Importa o router

app.use(router);

app.listen(port, () => { // Inicia o servidor na porta 5000 e exibe a mensagem no console. 
    console.log(`App rodando na porta: ${port}`);
})
