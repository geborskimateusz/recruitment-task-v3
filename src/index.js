const express = require('express')
const {json}  = require('body-parser')

const routes = require('./routes/routes.js')

const PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();
app.use(json());

app.use(routes.findAllRouter);
app.use(routes.createRouter);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})