import { api, requestConfig } from '../utils/config'

//Publicar foto
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true)

    try {
        const res = await fetch(api + '/photos', config)
            .then((res) => res.json())
            .catch((err) => err)

        return res;
    } catch (error) {
        console.log('Erro:', error)
    }
};

//Get fotos de usuário
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + '/photos/user/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro:', error)
    }
};

//Excluir fotos
const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token)
    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro:', error)
    }
};

// Update uma foto
const updatePhoto = async (id, data, token) => {
    const config = requestConfig("PUT", data, token)
    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro:', error)
    }
};

//GET foto por id
const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro getPhoto:', error)
    }
};

// Likes
const like = async (id, token) => {
    const config = requestConfig("PUT", null, token)

    try {
        const res = await fetch(api + '/photos/like/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro like:', error)
    }
};

//Comentários
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + '/photos/comment/' + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro comment:', error)
    }
};

//Home toda as fotos
const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token)
    try {
        const res = await fetch(api + '/photos', config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log('Erro getPhotos Home:', error)
    }
}


//Exportar funções
const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
};

export default photoService