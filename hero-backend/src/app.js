const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');
const app = express();

//Exemplo para producao: app.use(cors({origin: 'http://meuappmaroto.com'}));
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
