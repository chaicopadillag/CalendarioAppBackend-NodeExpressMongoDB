const { response } = require('express');

const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 400,
			statusText: 'Revisa los campos requeridos',
			errores: errors.mapped(),
		});
	}
	next();
};

module.exports = {
	validarCampos,
};
