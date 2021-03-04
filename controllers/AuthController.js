const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generateJsonWebToken } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
	const { correo, contrasenia } = req.body;

	try {
		let usuario = await Usuario.findOne({ correo });
		if (usuario) {
			return res.status(400).json({
				status: 400,
				statusText: 'El usuario con este correo ya existe',
			});
		}
		usuario = new Usuario(req.body);
		// encriptar contraseña
		let salt = bcrypt.genSaltSync();
		usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

		await usuario.save();
		const token = await generateJsonWebToken(usuario.id, usuario.nombre);
		res.status(201).json({
			status: 201,
			statusText: 'Usuario registrado correctamente',
			usuario: {
				uid: usuario.id,
				nombre: usuario.nombre,
				correo: usuario.correo,
				token,
			},
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			status: 500,
			statusText: 'Error al crear usario, por favor hable con el administrador del sistema',
		});
	}
};

const loginUsuario = async (req, res = response) => {
	const { correo, contrasenia } = req.body;

	try {
		const usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			return res.status(400).json({
				status: 400,
				statusText: 'El usuario con este correo no existe',
			});
		}

		const verifyPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);
		if (!verifyPassword) {
			return res.status(400).json({
				status: 400,
				statusText: 'Contraseña incorrecta intente de nuevo',
			});
		}

		const token = await generateJsonWebToken(usuario.id, usuario.nombre);

		return res.status(200).json({
			status: 200,
			statusText: 'Bienvenido al Calendar Event',
			user: {
				nombre: usuario.nombre,
				correo: usuario.correo,
				uid: usuario._id,
				token,
			},
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			status: 500,
			statusText: 'Error al iniciar sesión, por favor hable con el administrador del sistema',
		});
	}
};

const revalidadToken = async (req, res = response) => {
	const { uid, nombre } = req;
	const token = await generateJsonWebToken(uid, nombre);
	res.status(200).json({
		status: 200,
		statusText: 'Token gnerado correctamente',
		user:{
			uid,
			nombre,
			token
		}
,	});
};
module.exports = {
	crearUsuario,
	loginUsuario,
	revalidadToken,
};
