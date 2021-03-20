const express = require('express');
const { validateGenres } = require('../schemas/validation/schema-validator');
const { movie } = require('../models/movie')
const http = require('../util/http')


const router = express.Router();

router.get('/api/movies/findAll/:runtime?/:genres?', async (req, res, next) => {

    try {
        let movies = [];
        if (http.containsParams(req.query)) {
            let params = {};
            if (req.query.runtime) {
                params["runtime"] = req.query.runtime;
            }

            if (req.query.genres) {
                const genres = http.paramAsArray(req.query.genres);
                params["genres"] = await validateGenres(genres);

            }
            movies = await movie.find(params);
        } else {
            movies = [await movie.findAny()];
        }
        res.status(200).json(movies)
    } catch (err) {
        next(err);
    }
})



module.exports = { findAllRouter: router }