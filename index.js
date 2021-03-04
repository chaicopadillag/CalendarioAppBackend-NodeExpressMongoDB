const { json } = require('express');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { dbConection } = require('./database/configdb');


// console.log(process.env);
const app = express();

dbConection();

// TODO: Cors
app.use(cors());
app.use(express.static('public'));

app.get('*', ( req, res ) => {
    res.sendFile( path.join( __dirname+'/public/index.html' ) );
});

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en Puerto: ${process.env.PORT}`);
});
