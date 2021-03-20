const express = require('express');
const { json } = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs")

const { findAllRouter } = require('./routes/findAll');
const { createRouter } = require('./routes/create');
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors/not-found-error');

const swaggerDocument = YAML.load('src/swagger/swagger.yaml');

const PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();
app.use(json());

app.use(findAllRouter);
app.use(createRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', async (req, res) => {
    res.status(404).json({ "errors": [ { "message": "No such endpoint" } ] })
});

app.use(errorHandler);


const start = () => app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

module.exports = { start }