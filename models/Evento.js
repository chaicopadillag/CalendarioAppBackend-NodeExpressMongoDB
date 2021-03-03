const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

EventoSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	delete object._id;
	return object;
});

module.exports = model('Evento', EventoSchema);
