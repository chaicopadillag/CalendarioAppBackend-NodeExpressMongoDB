/**
 * Events routes
 * /api/events
 *
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/EventoController');
const validarFecha = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJsonWebToken } = require('../middlewares/validarJsonWebToken');

const router = Router();
router.use(validarJsonWebToken);

router.get('/', obtenerEventos);
router.post(
	'/',
	[
		check('title', 'El titulo es requerido').not().isEmpty(),
		check('start', 'Fecha inicial es requerido').custom(validarFecha),
		check('end', 'Fecha fin es requerido').custom(validarFecha),
		validarCampos,
	],
	crearEvento
);
router.put(
	'/:id',
	[
		check('title', 'El titulo es requerido').not().isEmpty(),
		check('start', 'Fecha inicial es requerido').custom(validarFecha),
		check('end', 'Fecha fin es requerido').custom(validarFecha),
		validarCampos,
	],
	actualizarEvento
);
router.delete('/:id', eliminarEvento);

module.exports = router;
