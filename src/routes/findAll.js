const express = require('express');
const { param } = require('express-validator');
const { validateQuery } = require('../middlewares/query-validator')
const models = require('../models/index.js')


const router = express.Router();

//localhost:3000/api/movies/findAll/?&genres=a&genres=v&duration=0
router.get('/api/movies/findAll/:duration?/:genres?', validateQuery('genres'), (req, res) => {

    let params = {};
    if (req.query.duration) {
        params["duration"] = req.query.duration;
    }

    if (req.query.genres) {
        params["genres"] = req.query.genres;
    }

    const movies = models.movie.findAll(params)
    res.status(200).json(movies)

})



module.exports = { router }