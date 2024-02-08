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
        return;
    }

    res.status(201).json(newPhoto)
};

// Excluir uma foto
const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

        // Validar se a foto existe
        if (!photo) {
            res.status(404).json({
                errors: ["Foto não encontrada"]
            });
            return;
        };

        // Validar se o usuário é o dono da foto
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: ["Você não tem permissão para excluir essa foto"]
            });

        }
        await Photo.findByIdAndDelete(photo._id);

        res
            .status(200)
            .json({ id: photo._id, message: "Foto excluída com sucesso" });

    } catch (error) {
        res
            .status(404)
            .json({ errors: ["Não foi possivel deletar pois a foto não foi encontrada"] });
        return;
    };
};

// Pegar todas as fotos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos);
};

// Pegar as fotos de um usuário
const getUserPhotos = async (req, res) => {

    const { id } = req.params;

    const photos = await Photo.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos);


}

// Exportar os métodos
module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
}