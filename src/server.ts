const express = require('express');
const { json } = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { findAllRouter } = require('./routes/findAll');
const { createRouter } = require('./routes/create');
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors/not-found-error');

const swaggerDocument = YAML.load('swagger.yaml');

const app = express();
app.use(json());

app.use(findAllRouter);
app.use(createRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };