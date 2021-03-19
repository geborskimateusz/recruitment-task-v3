const express = require('express')
const { json } = require('body-parser')
const { findAllRouter } = require('./routes/findAll')
const { createRouter } = require('./routes/create')
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors/not-found-error');

const PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();
app.use(json());

app.use(findAllRouter);
app.use(createRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


const start = () => app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

module.exports = { start }