const { ValidationError } = require('../../../errors/validation-error');
const { validateGenres } = require('../genres-validator');

it('Validation error should be thrown', async () => {
    let genres = [
        "Comedy",
        "FantasyInvalid"
    ];

    await expect(validateGenres(genres)).rejects.toThrow(ValidationError);
});


