const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJsonWebToken = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			status: 401,
			statusText: 'No hay Token en la petición',
		});
	}
	try {
		const payload = jwt.verify(token, process.env.SECRET_JSON_WEB_TOKEN);
		req.uid = payload.uid;
		req.nombre = payload.nombre;
	} catch (error) {
		console.log('Error en: ' + error);

		return res.status(401).json({
			status: 401,
			statusText: 'El Token de la petición no existe o es inválido',
		});
	}
	next();
}
;
module.exports = {
	validarJsonWebToken,
};
