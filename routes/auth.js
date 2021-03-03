/**
 * Rutas de Usuarios /auth
 * host+/api/auth
 *
 */
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { crearUsuario, loginUsuario, revalidadToken } = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJsonWebToken } = require('../middlewares/validarJsonWebToken');

router.post(
	'/register',
	[
		check('nombre', 'El nombre es requerido').not().isEmpty(),
		check('correo', 'El correo no es válido').isEmail(),
		check('contrasenia', 'La contraseña de ser de 6 caracteres').isLength({ min: 6 }),
		validarCampos,
	],
	crearUsuario
);

router.post(
	'/',
	[check('correo', 'El correo no es válido').isEmail(), check('contrasenia', 'La contraseña de ser de 6 caracteres').isLength({ min: 6 }), validarCampos],
	loginUsuario
);

router.get('/verify-token', validarJsonWebToken, revalidadToken);

module.exports = router;
