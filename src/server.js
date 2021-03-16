const express = require('express')
const { json } = require('body-parser')
const {findAllRouter} = require('./routes/findAll')
const {createRouter} = require('./routes/create')

const PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();
app.use(json());

app.use(findAllRouter);
app.use(createRouter);


const start = () => app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

module.exports = { start }