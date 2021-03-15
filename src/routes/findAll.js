const express = require('express');
const { param } = require('express-validator');
const { validateQuery } = require('../middlewares/query-validator')
const models = require('../models/index.js')
const http = require('../util/http')


const router = express.Router();

router.get('/api/movies/findAll/:runtime?/:genres?', validateQuery('genres'), (req, res) => {

    let params = {};
    if (req.query.runtime) {
        params["runtime"] = req.query.runtime;
    }

    if (req.query.genres) {
        params["genres"] = http().queryAsArray(req.query.genres);
    }

    console.log(params)

    const movies = models.movie.findAll(params)
    res.status(200).json(movies)

})



module.exports = { router }