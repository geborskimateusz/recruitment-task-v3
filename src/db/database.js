const { param } = require('express-validator');
const fs = require('fs')
const hash = require('../util/hash')

let cache = {
    "genres": [],
    "movies": {},
    "queries": {}
}

function database(schema) {

    let findAll = (filterParams) => {

        if (filterParams) {
            const key = hash().toHash(filterParams);

            if (cache['queries'][key]) {
                const movieIds = cache['queries'][key];
                return movieIds.map(id => cache['movies'][id]);
            } else {
                return readFromFile(filterParams)
            }

        } else {
            console.log("Read from file")
            return readFromFile()
        }


    }



    const setCache = (schema, result, filterParams) => {
        switch (schema) {
            case 'genres':
                cache[schema] = result;
                break;
            case 'movies':
                const ids = result.map(movie => {
                    cache[schema][movie.id] = movie;
                    return movie.id;
                });

                if (filterParams) {
                    const key = hash().toHash(filterParams)
                    cache['queries'][key] = ids;
                }
                break;
        }
    }

    const readFile = () => {
        const rawdata = fs.readFileSync('data/db.json');
        return JSON.parse(rawdata);
    }

    const readFromFile = filterParams => {
        const data = readFile();
        let queryData = data[schema];

        if (filterParams) {
            queryData = filterData(queryData, filterParams)
        }

        setCache(schema, queryData, filterParams)
        return queryData;
    }

    const filterData = (data, filter) => {
        return data.reduce((acc, el) => {
            let found = false;
            for (let param in filter) {
                let values = filter[param];

                if (values instanceof Array) {
                    console.log(el[param], values)

                    found = values.every(data => el[param].includes(data))
                } else {
                    found = el[param] == values;
                }

                if (!found) {
                    return acc;
                }
            }

            acc.push(el)
            return acc
        }, [])
    }



    return { findAll }



}

module.exports = database;