
const express = require('express')
const { validateMovieSchema } = require('../schemas/validation/movie-validator')
const { movie } = require('../models/movie')

const router = express.Router();

router.post('/api/movies/', async (req, res, next) => {
    try {
        await validateMovieSchema(req.body);
        const movieCreated = await movie.create(req.body);
        return res.status(201).json(movieCreated);
    } catch (err) {
        next(err);
    }
})

module.exports = { createRouter: router }