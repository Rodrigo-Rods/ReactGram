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
};

// Pegar uma foto pelo id
const getPhotoById = async (req, res) => {
    const { id } = req.params;

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // Verificar se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ["Foto não encontrada"]
        });
        return;
    }

    res.status(200).json(photo);
};

// Update de uma foto
const updatePhoto = async (req, res) => {

    const { id } = req.params;

    const { title } = req.body;

    const reqUser = req.user;

    const photo = await Photo.findById(id);

    // Checar se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ["Foto não encontrada"]
        });
        return;
    }

    //Checar se o usuário é o dono da foto
    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({
            errors: ["Você não tem permissão para editar essa foto"]
        });
        return;
    }
    if (title) {
        photo.title = title;
    }
    await photo.save();
    res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
}

// Likes de uma foto
const likePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    const photo = await Photo.findById(id);

    // Checar se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ["Foto não encontrada"]
        });
        return;
    }

    // Checar se o usuário já deu like
    if (photo.likes.includes(reqUser._id)) {
        res.status(422).json({ errors: ["Você já deu like nessa foto"] });
        return;
    }
    // Adicionar o like
    photo.likes.push(reqUser._id);
    await photo.save();

    res.status(200).json({ photoId: id, userId: reqUser._id, message: "Like adicionado com sucesso" });
}

//Comentarios de uma foto
const commentPhoto = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(id);

    // Checar se a foto existe
    if (!photo) {
        res.status(404).json({
            errors: ["Foto não encontrada"]
        });
        return;
    }

    // Adicionar o comentario no array de comentarios
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
        comment: userComment,
        message: "Comentário adicionado com sucesso"
    });
};

// Buscar uma foto por título
const searchPhotos = async (req, res) => {
    const { q } = req.query;

    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec()

    res.status(200).json(photos);

}



// Exportar os métodos
module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
}