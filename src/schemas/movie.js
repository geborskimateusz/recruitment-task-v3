const Joi = require('joi');
const { validateGenres } = require('./validation/genres-validator');
const createMovie = Joi.object({
    genres: Joi.array().items(Joi.string())
        .external(async genres => {
            await validateGenres(genres);
            return genres;
        })
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "any.custom":
                        err.message = "Invalid genre";
                        break;
                    default:
                        break;

                }
            });
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