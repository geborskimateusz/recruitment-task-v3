const fs = require('fs')

function database(schema) {
    const CACHED_MOVIES = [];
    const CACHED_GENRES = [];

    const findAll = (params) => {
        console.log(params)

        //first check in cache then read file

        let rawdata = fs.readFileSync('data/db.json');
        let json = JSON.parse(rawdata);

        const result = json[schema];

        // if (params) {
        //     console.log("filtering schema by params")
        //     return "Filtered by params"
        // }
        return result;
    }

    return { findAll }

}

module.exports = database;