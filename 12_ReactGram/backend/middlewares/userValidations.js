const { body } = require('express-validator');
const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome de usuário é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome de usuário deve ter no mínimo 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Insira um email válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha deve ter no mínimo 6 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A confirmação de senha deve ter no mínimo 6 caracteres.")
            .custom((value, { req }) => { // Customizada pois não existe nativamente para comparar campos.
                if (value != req.body.password) {
                    throw new Error("As senhas devem ser iguais."); // Custom é disparada dessa forma.
                }
                return true;
            }),
    ];
};

// Validação de login
const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Insira um email válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
    ];
};

// Validação de atualização de usuário
const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 })
            .isString()
            .withMessage("O nome de usuário deve ter no mínimo 3 caracteres."),
        body("password")
            .optional()
            .isLength({ min: 6 })
            .withMessage("A senha deve ter no mínimo 6 caracteres."),
    ];
};
module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
};