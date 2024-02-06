const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_PASS;

// Gerando UserToken
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "30d" // 30 dias até fazer o logout do usuário
    });
};

// Registrar usuário e sign In
const register = async (req, res) => {

    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    const user = await User.findOne({ email });
    if (user) {
        res
            .status(422)
            .json({ errors: ["Usuário já existe, faça login ou utilize outro email."] })
        return;
    }

    // Criptografar senha. Ex: Senha123 -> 89u312w09ed0j912e
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    })

    // Checar se o usuário foi criado no banco de dados
    if (!newUser) {
        res
            .status(422)
            .json({ errors: ["Houve um erro ao criar usuário, tente novamente mais tarde."] })
        return;
    }

    // Gerar token
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })
    console.log('User registered successfully');
};
module.exports = {
    register,
};
