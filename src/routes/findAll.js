const express = require('express');

const { movie } = require('../models/movie');
const { queryValidator } = require('../middlewares/query-validator');
const http = require('../util/http');

const router = express.Router();

router.get('/api/movies/findAll/:runtime?/:genres?', queryValidator, async (req, res) => {
    let movies = [];
    if (http.containsParams(req.query)) {
        let params = {};
        if ('runtime' in req.query) {
            params["runtime"] = req.query.runtime;
        }

        if ('genres' in req.query) {
            params["genres"] = http.paramAsArray(req.query.genres);
        }
        movies = await movie.find(params);
    } else {
        movies = [await movie.findAny()];
    }
    res.status(200).json(movies);
});

module.exports = { findAllRouter: router };