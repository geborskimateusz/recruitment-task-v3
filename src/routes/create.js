const express = require('express')
const { movie } = require('../models/movie')
const { validateMovie } = require('../middlewares/body-validator')

const router = express.Router();

router.post('/api/movies/', validateMovie, async (req, res) => {
    const movieCreated = await movie.create(req.body);
    return res.status(201).json(movieCreated);
})

module.exports = { createRouter: router }