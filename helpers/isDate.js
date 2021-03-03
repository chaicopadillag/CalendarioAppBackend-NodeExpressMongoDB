const moment = require('moment');

const validarFecha = (value) => {
	if (!value) {
		return false;
	}
	const fecha = moment(value);

	if (fecha.isValid()) {
		return true;
	}
};

module.exports = validarFecha;
