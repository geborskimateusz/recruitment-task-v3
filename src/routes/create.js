const express = require('express')
const { body, validationResult } = require('express-validator')
const { validateGenres } = require('../middlewares/schema-validator')
const { movie } = require('../models/movie')

const router = express.Router();

router.post('/api/movies/',
    body('genres')
        .isArray()
        .withMessage('Property genres should be array of string.').bail()
        .custom(validateGenres).bail(),
    body('title')
        .not().isEmpty()
        .withMessage('Property title is required.').bail()
        .isString()
        .withMessage('Property title must be string.').bail()
        .isLength({ max: 255 })
        .withMessage('Property title must have maximum 255 characters.').bail(),
    body('year')
        .not().isEmpty()
        .withMessage('Property year is required.').bail()
        .isNumeric()
        .withMessage('Property year must be number.').bail(),
    body('runtime')
        .not().isEmpty()
        .withMessage('Property runtime is required.').bail()
        .isNumeric()
        .withMessage('Property runtime must be number.').bail(),
    body('director')
        .not().isEmpty()
        .withMessage('Property director is required.').bail()
        .isString()
        .withMessage('Property director must be string.').bail()
        .isLength({ max: 255 })
        .withMessage('Property director must have maximum 255 characters.').bail(),
    body('actors')
        .isString()
        .withMessage('Property actors  must be string.').bail(),
    body('plot')
        .isString()
        .withMessage('Property plot must be string.').bail(),
    body('posterUrl')
        .isString()
        .withMessage('Property plot must be string.').bail(),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array())
        }

        const movieCreated = movie.create(req.body);
        
        return res.status(201).json(movieCreated);
    })

module.exports = { createRouter: router }