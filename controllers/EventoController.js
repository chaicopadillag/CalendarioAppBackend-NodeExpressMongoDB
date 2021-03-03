const { response } = require('express');
const Evento = require('../models/Evento');

const crearEvento = async (request, res = response) => {
	try {
		const evento = new Evento(request.body);
		evento.user = request.uid;
		const newEvento = await evento.save();

		return res.status(201).json({
			status: 201,
			statusText: 'Se ha creado un nuevo evento correctamente',
			evento: newEvento,
		});
	} catch (error) {
		console.log('Error en: ' + error);

		return res.status(500).json({
			status: 500,
			statusText: 'Se ha producido un error al crear un nuevo evento',
		});
	}
};

const actualizarEvento = async (request, res = response) => {
	try {
		const idEvento = request.params.id;

		const evento = await Evento.findById(idEvento);

		if (!evento) {
			return res.status(404).json({
				status: 404,
				statusText: 'El evento a actualizar no existe',
			});
		}

		if (evento.user.toString() !== request.uid) {
			return res.status(401).json({
				status: 401,
				statusText: 'No tiene permisos para editar este evento',
			});
		}

		const eventEdit = {
			...request.body,
			user: request.uid,
		};

		const eventoUpdate = await Evento.findByIdAndUpdate(idEvento, eventEdit, { new: true });

		return res.status(201).json({
			status: 201,
			statusText: 'Se ha actualizado el evento correctamente',
			evento: eventoUpdate,
		});
	} catch (error) {
		console.log('Error en: ' + error);

		return res.status(500).json({
			status: 500,
			statusText: 'Se ha producido un error al actualizar el evento',
		});
	}
};

const eliminarEvento = async (request, res = response) => {
	try {
		const idEvento = request.params.id;

		const evento = await Evento.findById(idEvento);

		if (!evento) {
			return res.status(404).json({
				status: 404,
				statusText: 'El evento ha eliminar no existe',
			});
		}

		if (evento.user.toString() !== request.uid) {
			return res.status(401).json({
				status: 401,
				statusText: 'No tiene permisos para eliminar este evento',
			});
		}

		await Evento.findByIdAndDelete(idEvento);

		return res.status(201).json({
			status: 201,
			statusText: 'Se ha eliminado el evento correctamente',
		});
	} catch (error) {
		console.log('Error en: ' + error);

		return res.status(500).json({
			status: 500,
			statusText: 'Se ha producido un error al eliminar el evento',
		});
	}
};

const obtenerEventos = async (request, res = response) => {
	try {
		const eventos = await Evento.find().populate('user', 'nombre');
		return res.status(201).json({
			status: 201,
			statusText: 'Obeteniendo los eventos',
			eventos,
		});
	} catch (error) {
		console.log('Error en: ' + error);

		return res.status(500).json({
			status: 500,
			statusText: 'Se ha producido al cargar los eventos',
		});
	}
};

module.exports = {
	crearEvento,
	actualizarEvento,
	eliminarEvento,
	obtenerEventos,
};
