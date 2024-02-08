const express = require('express');
const router = express.Router();

// Controllers
const {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
} = require('../controllers/UserController');

// Middlewares
const validate = require('../middlewares/handleValidation');
const {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
} = require('../middlewares/userValidations');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');
const { getPhotoById } = require('../controllers/PhotoController');

// Rotas
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser)
router.put("/",
    authGuard,
    userUpdateValidation(),
    validate,
    imageUpload.single("profileImage"),
    update);

router.get("/:id", getUserById);
router.get("/:id", authGuard, getPhotoById)

module.exports = router; 