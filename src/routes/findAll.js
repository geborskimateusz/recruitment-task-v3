const express = require('express');
const { validateQuery } = require('../middlewares/query-validator')
const { movie } = require('../models/movie')
const http = require('../util/http')


const router = express.Router();

router.get('/api/movies/findAll/:runtime?/:genres?', validateQuery('genres'), (req, res) => {

    let params;
    if (http.containsParams(req.query)) {
        params = {};
        if (req.query.runtime) {
            params["runtime"] = req.query.runtime;
        }

        if (req.query.genres) {
            params["genres"] = http.paramAsArray(req.query.genres);
        }
    }

    const movies = movie.findAll(params)
    res.status(200).json(movies)

})



module.exports = { findAllRouter: router }