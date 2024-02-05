const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Gerando UserToken
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "30d" // 30 dias até fazer o logout do usuário
    });
};

// Registrar usuário e sign In
const register = async (req, res) => {
    res.send("Registro de usuário..."); // Mensagem teste pra API
};

module.exports = {
    register,
}
