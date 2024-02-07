const multer = require('multer');
const path = require('path');

// Destino do arquivo
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users";
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos";
        }
        cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Salva o nome como string de data + extensão do arquivo
    }
})

// Upload de imagem
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // Upload apenas de img jpg, jpeg e png
            return cb(new Error("Por favor, envie um arquivos de formato jpg, jpeg ou png."))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload };