const { body } = require('express-validator');

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O titulo da foto é obrigatório.")
            .isString()
            .withMessage("O titulo da foto é obrigatório.")
            .isLength({ min: 3, max: 50 })
            .withMessage("O titulo da foto deve ter entre 3 e 50 caracteres."),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória.")
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {

    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo da foto é obrigatório.")
            .isLength({ min: 3, max: 50 })
            .withMessage("O titulo da foto deve ter entre 3 e 50 caracteres."),


    ]

}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
}