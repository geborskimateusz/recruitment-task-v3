const { param } = require('express-validator');
const fs = require('fs')

function database(schema) {
    let cache = {
        "genres": [],
        "movies": []
    }

    let findAll = (params) => {


        const rawdata = fs.readFileSync('data/db.json');
        const json = JSON.parse(rawdata);
        let queryData = json[schema];

        if (params) {
        
            queryData = queryData.reduce((acc, el) => {
                let found = false;
                for (let param in params) {
                    let values = params[param];

                    if (values instanceof Array) {
                        found = el[param].includes(values)
                    }
                    else {
                        found = el[param] == values;
                    }

                    if (found) {
                        acc.push(el)
                    }

                }
                return acc
            }, [])
        }

        // setCache(schema, result)
        return queryData;
    }

    const setCache = (schema, result) => {
        switch (schema) {
            case 'genres':
                cache[schema] = result;
                break;
            case 'movies':
                result.forEach(movie => {
                    cache[schema][movie.id] = movie;
                });
                break;
        }
    }

    return { findAll }

}

module.exports = database;