const express = require('express')
const { validateQuery } = require('../middlewares/query-validator')
const models = require('../models/index.js')


const router = express.Router();

//localhost:3000/api/movies/findAll/?&genres=a&genres=v&duration=0
router.get('/api/movies/findAll/:duration?/:genres?', validateQuery('genres'),  (req, res) => {
    
    let params;
    if (req.query.duration) {
        params["duration"] = req.query.duration;
    }

    if (req.query.genres) {
        params["genres"] = req.query.genres;
    }

    const movies = await models.movie.findAll(params)

    res.send('Find All')

})



module.exports = { router }