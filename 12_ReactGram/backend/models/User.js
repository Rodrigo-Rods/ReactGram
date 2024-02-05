const mongoose = require('mongoose');
const { Schema } = mongoose; // Schema é um método do mongoose que cria um novo esquema

const userSchema = new Schema( // Esquema que define a estrutura do usuário no banco de dados
    {
        name: String,
        email: String,
        password: String,
        profileImage: String,
        bio: String,
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema); // Cria um modelo de usuário com base no esquema
module.exports = User; 
