const { ValidationError } = require('../../errors/validation-error');
const { genre } = require('../../models/genre');

const validateGenres = async (genres) => {
    const fromDB = await genre.find();
    const validationArr = genres.reduce((acc, e) => {
        if (!fromDB.includes(e)) {
            acc.push(e);
        }
        return acc;
    }, []);

    if (validationArr.length !== 0) {
        throw new ValidationError(`Missing genres ${validationArr}`);
    }

    return genres;
};



module.exports = { validateGenres };