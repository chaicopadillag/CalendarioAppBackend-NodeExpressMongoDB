const jwt = require('jsonwebtoken');

const generateJsonWebToken = (uid, nombre) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, nombre };

		jwt.sign(
			payload,
			process.env.SECRET_JSON_WEB_TOKEN,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se ha podido generar el Otken');
				}
				resolve(token);
			}
		);
	});
};

module.exports = {
	generateJsonWebToken,
};
