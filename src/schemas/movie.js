const Joi = require('joi');
const { validateGenres } = require('../middlewares/schema-validator')
const createMovie = Joi.object({
    genres: Joi.array().items(Joi.string())
        .custom(genres => {
            console.log("here1")
            validateGenres(genres);
            return genres
        })
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "any.custom":
                        err.message = "Invalid genre"
                        break
                    default:
                        break;

                }
            })
            return errors;
        }),
    title: Joi.string().max(255).required(),
    year: Joi.number().required(),
    runtime: Joi.number().required(),
    director: Joi.string().max(255).required(),
    actors: Joi.string(),
    plot: Joi.string(),
    posterUrl: Joi.string()

}).strict();

module.exports = { createMovie };