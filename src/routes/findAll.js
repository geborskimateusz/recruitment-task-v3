const express = require('express');
const { validateQuery } = require('../middlewares/query-validator')
const { movie } = require('../models/movie')
const http = require('../util/http')


const router = express.Router();

router.get('/api/movies/findAll/:runtime?/:genres?', validateQuery('genres'), (req, res) => {

    let movies = [];
    if (http.containsParams(req.query)) {
        let params = {};
        if (req.query.runtime) {
            params["runtime"] = req.query.runtime;
        }

        if (req.query.genres) {
            params["genres"] = http.paramAsArray(req.query.genres);
        }
        movies = movie.find(params);
    } else {
        movies = [movie.findAny()];
    }


    res.status(200).json(movies)

})



module.exports = { findAllRouter: router }