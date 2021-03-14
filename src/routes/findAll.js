const express = require('express')
const { validateQuery } = require('../middlewares/query-validator')
const {body} = require('express-validator')


const router = express.Router();

//localhost:3000/api/movies/findAll/?&genres=a&genres=v&duration=0
router.get('/api/movies/findAll/:duration?/:genres?', validateQuery('genres'),  (req, res) => {
    if (req.query.duration) {
        console.log("duration: " + req.query.duration);
    }

    if (req.query.genres) {
        console.log("genres: " + req.query.genres);
    }

    res.send('Find All')

})



module.exports = { router }