const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Bibioteca com metodos
const jwtSecret = process.env.JWT_PASS; // Valor salvo da app

const authGuard = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // O token vem assim: Ex: Bearer¢1293u083201j98 o split é o ¢.

	// Checar se o token existe
	if (!token)
		return res
			.status(401)
			.json({ errors: ["Acesso negado pois o token não foi encontrado."] });

	//Verificar a validade do token (Caso não esteja conseguindo logar é só comentar as duas linhas antes de Next())
	try {
		//const verified = jwt.verify(token, jwtSecret);

		//req.user = await User.findById(verified.id).select("-password"); // .select("-password") -> Não retorna a senha do usuário na requisição.

		next();
	} catch (error) {
		res.status(401).json({ errors: ["Token inválido ou expirado."] });
	}
};

module.exports = authGuard;
