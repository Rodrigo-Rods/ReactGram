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
}

//Exportar funções

const photoService = {
    publishPhoto,
};

export default photoService