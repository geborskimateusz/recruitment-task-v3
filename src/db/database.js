const fs = require('fs')
const hash = require('../util/hash')
const cache = require('./cache')

const { DatabaseError } = require('../errors/database-error')

const FILE_PATH = 'data/db.json';

function database(schema) {

    const find = async (filterParams) => {
        switch (schema) {
            case 'movies':

                // if both query paramters were supplied you can try to read from in memory cache that holds latest queries
                if (Object.keys(filterParams).length > 1) {
                    const key = hash.toHash(filterParams);
                    return cache.getCache()['queries'][key] ? cache.readFromQueryCache(key) : readFromFile(filterParams, true);
                } else {
                    return readFromFile(filterParams, false)
                }
            case 'genres':
                return cache.getCache()['genres'].length !== 0 ? cache.getCache()['genres'] : await readFromFile()
        }
    }

    const create = async data => {
        let json = await readFile();
        data = { id: json[schema].length + 1, ...data };
        json[schema].push(data);
        await writeToFile(json)
        return data;
    }

    const findAny = async () => await readAny();

    const readFile = async () => {
        const rawdata = await fs.promises.readFile(FILE_PATH);
        return JSON.parse(rawdata);
    }

    const writeToFile = async data => {
        await fs.promises.writeFile(FILE_PATH, JSON.stringify(data, null, 2),
            err => {
                if (err) {
                    console.error(err)
                    throw new DatabaseError(`Something went wrong during writing to ${schema}.`);
                }
            });
    }

    const readAny = async () => {
        const movies = await readFromFile();
        return movies[Math.floor(Math.random() * movies.length - 1)]
    }

    const readFromFile = async (filterParams, shouldCache) => {
        const data = await readFile();
        let queryData = data[schema];

        if (filterParams) {
            queryData = filterData(queryData, filterParams)
        }

        //If we provide only genres parameter or If we provide both duration and genres parameter,
        if (filterParams) {
            if (Object.keys(filterParams).length === 1 && filterParams['genres'] || Object.keys(filterParams).length > 1) {
                queryData = sortByGenresAccuracy(queryData, filterParams['genres'])
            }
        }

        if (shouldCache) {
            cache.setCache(schema, queryData, filterParams)
        }

        return queryData;
    }

    // Iterate over filter 
    // For example:
    // {
    //   runtime: 120,
    //   genres: ["Comedy", "Drama"]   
    // }
    const filterData = (data, filter) => {
        return data.reduce((acc, el) => {
            let found = false;
            for (let param in filter) {
                let values = filter[param];

                if (values instanceof Array) {
                    found = values.some(data => el[param].includes(data))
                } else {
                    found = el[param] >= parseInt(values) - 10 && el[param] <= parseInt(values) + 10;
                }

                if (!found) {
                    return acc;
                }
            }

            acc.push(el)
            return acc
        }, [])
    }

    // If we send a request with genres [Comedy, Fantasy, Crime]
    // then the top hits should be movies that have all three of them, then there should be movies
    // that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime]
    // and then those with Comedy only, Fantasy only and Crime only.
    const sortByGenresAccuracy = (data, filter) => data
        .reduce((acc, movie, index) => {
            const filteredArray = movie.genres.filter(value => filter.includes(value))
            acc.push({ index, genres: filteredArray });
            return acc;
        }, [], 0)
        .sort((a, b) => (a.genres.length > b.genres.length) ? -1 : 1)
        .map(sortedArr => data[sortedArr.index]);



    return { find, findAny, create }
}

module.exports = database;