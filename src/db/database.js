const fs = require('fs')
const hash = require('../util/hash')
const cache = require('./cache')
const { DatabaseError } = require('../errors/database-error')

const FILE_PATH = 'data/db.json';

function database(schema) {

    const find = (filterParams) => {

        switch (schema) {
            case 'movies':
                const key = hash.toHash(filterParams);
                return cache.getCache()['queries'][key] ? cache.readFromQueryCache(key) : readFromFile(filterParams, true);
            case 'genres':
                return cache.getCache()['genres'].length !== 0 ? cache.getCache()['genres'] : readFromFile()
        }
    }

    const create = data => {
        let json = readFile();
        data = { id: json[schema].length + 1, ...data };
        json[schema].push(data);
        writeToFile(json)
        return data;
    }

    const findAny = () => readAny();

    const readFile = () => {
        const rawdata = fs.readFileSync(FILE_PATH);
        return JSON.parse(rawdata);
    }

    const writeToFile = data => {
        fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2),
            err => {
                if (err) {
                    console.error(err)
                    throw new DatabaseError(`Something went wrong during writing to ${schema}.`);
                }
            });
    }

    const readAny = () => {
        const movies = readFromFile()
        return movies[Math.floor(Math.random() * movies.length - 1)]
    }

    const readFromFile = (filterParams, shouldCache) => {
        const data = readFile();
        let queryData = data[schema];

        if (filterParams) {
            queryData = filterData(queryData, filterParams)
        }

        if (shouldCache) {
            cache.setCache(schema, queryData, filterParams)
        }

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



    return { find, findAny, create }
}

module.exports = database;