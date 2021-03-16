const fs = require('fs')
const hash = require('../util/hash')
const cache = require('./cache')

function database(schema) {

    const find = (filterParams) => {

        switch (schema) {
            case 'movies':
                const key = hash.toHash(filterParams);
                return cache.getCache()['queries'][key] ? cache.readFromQueryCache(key) : readFromFile(filterParams);
            case 'genres':
                return cache.getCache()['genres'].length !== 0 ? cache.getCache()['genres'] : readFromFile()
        }
    }

    const findAny = () => readAny();

    const readFile = () => {
        const rawdata = fs.readFileSync('data/db.json');
        return JSON.parse(rawdata);
    }

    const readAny = () => {
        const data = readFile();
        const movies = data['movies'];
        console.log(movies[0])
        return movies[Math.floor(Math.random() * movies.length - 1)]
    }

    const readFromFile = filterParams => {
        const data = readFile();
        let queryData = data[schema];

        if (filterParams) {
            queryData = filterData(queryData, filterParams)
        }

        cache.setCache(schema, queryData, filterParams)
        return queryData;
    }

    const filterData = (data, filter) => {
        return data.reduce((acc, el) => {
            let found = false;
            for (let param in filter) {
                let values = filter[param];

                if (values instanceof Array) {
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



    return { find, findAny }
}

module.exports = database;