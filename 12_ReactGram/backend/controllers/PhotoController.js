const Photo = require('../models/Photo');
const mongoose = require('mongoose');
const User = require('../models/User');

// Inserir uma foto com o usuário relacionado
const insertPhoto = async (req, res) => {

    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findOne(reqUser._id);

    // Criar a foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // Verificar se a foto foi criada
    if (!newPhoto) {
        res.status(422).json({
            error: ["Não foi possível criar a foto, tente novamente mais tarde."]
        });
    }

    res.status(201).json(newPhoto)
};

module.exports = {
    insertPhoto,
}