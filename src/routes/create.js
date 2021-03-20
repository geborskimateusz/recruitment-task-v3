
const express = require('express')
const { validateMovieSchema } = require('../middlewares/movie-validator')
const { movie } = require('../models/movie')

const router = express.Router();

router.post('/api/movies/', validateMovieSchema(), (req, res) => {
    const movieCreated = movie.create(req.body);
    return res.status(201).json(movieCreated);
})

module.exports = { createRouter: router }