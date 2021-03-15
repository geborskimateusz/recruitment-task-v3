//walidacja czy są takie genres 
const { ValidationError } = require('../errors/validation-error')

function validateQuery(...fields) {

    return (req, res, next) => {
        for (const field of fields) {
            if (req.query[field]) { 
                try {
                    let param = req.query[field];
                    switch (field) {
                        case 'genres':
                            validateGenres(param)
                            break;
                    }
                } catch (err) {
                    return res.status(401).json(err.message)
                }
            }
        }

        next()

    };
}

const GENRE_CACHE = [
    "Comedy",
    "Fantasy",
    "Crime",
    "Drama",
    "Music",
    "Adventure",
    "History",
    "Thriller",
    "Animation",
    "Family",
    "Mystery",
    "Biography",
    "Action",
    "Film-Noir",
    "Romance",
    "Sci-Fi",
    "War",
    "Western",
    "Horror",
    "Musical",
    "Sport"
];

const validateGenres = (genres) => {
    if (GENRE_CACHE.length === 0) {
        //initialize from db
    }

    const validationArr = genres.reduce((acc, e) => {
        if (!GENRE_CACHE.includes(e)) {
            console.log("Does not include ", e)
            acc.push(e)
        }
        return acc
    }, [])

    if (validationArr.length !== 0) {
        console.log("err")
        throw new ValidationError(`Missing genres ${validationArr}`);
    }

}

module.exports = { validateQuery }