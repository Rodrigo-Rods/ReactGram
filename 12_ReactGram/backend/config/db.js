const mongoose = require('mongoose');

// Conexão com o banco de dados
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iictu9w.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("Conectado ao banco de dados...");

        return dbConn;
    } catch (error) {
        console.log(error);
    }
}

conn() // Chama a conexão com o banco de dados

module.exports = conn // Exporta a conexão com o banco de dados para ser utilizada em outros arquivos