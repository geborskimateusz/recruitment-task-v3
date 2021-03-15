const { param } = require('express-validator');
const fs = require('fs')

function database(schema) {
    let cache = {
        "genres": [],
        "movies": []
    }

    const findAll = (params) => {
        // console.log(params, schema)

        //first check in cache then read file

        const rawdata = fs.readFileSync('data/db.json');
        const json = JSON.parse(rawdata);
        const data = json[schema];

        let toReturn = data;
        if (params) {
            toReturn = data.reduce((acc, el) => {
                // let found = false;
                for (param in params) {
                    //         let values = params[param];

                    //         if (values instanceof Array) {
                    //             let existIn = (arr, target) => target.every(v => arr.includes(v));
                    //             found = existIn(el[param], values)
                    //         } else {
                    //             found = el[param] == values;
                    //         }

                    //         if (found) {
                    //             acc.push(el)
                    //         }

                    return acc
                }
            }, [])
        }

        // setCache(schema, result)

        // console.log(ca:w
        // che[schema].length, result.length)
        return toReturn;
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