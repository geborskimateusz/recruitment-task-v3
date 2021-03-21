const { ValidationError } = require('../../../errors/validation-error');
const { validateMovieSchema } = require('../movie-validator');

it('Validation error should be thrown', async () => {
    let invalidMovie = {
        genres: [
            "Comedy",
            "Fantasy"
        ],
        year: 2001,
        runtime: 12,
        director: "12"
    };

    await expect(validateMovieSchema(invalidMovie)).rejects.toThrow(ValidationError);
});


