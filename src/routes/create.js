const express = require('express')

const router = express.Router();

router.get('/api/movies/', (req, res) => {
    res.send('Create')
})

module.exports = {router}