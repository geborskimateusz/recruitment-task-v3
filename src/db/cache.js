const hash = require('../util/hash')

let memcache = {
    "genres": [],
    "movies": {},
    "queries": {}
}

function cache() {

    const getCache = () => memcache;

    const readFromQueryCache = queryKey => {
        const movieIds = memcache['queries'][queryKey];
        return movieIds.map(id => memcache['movies'][id]);
    }

    const setCache = (schema, result, filterParams) => {
        switch (schema) {
            case 'genres':
                if(memcache['genres'].length == 0) {
                    memcache['genres'] = result;
                }
                break;
            case 'movies':
                const ids = result.map(movie => {
                    memcache[schema][movie.id] = movie;
                    return movie.id;
                });

                if (filterParams) {
                    const key = hash.toHash(filterParams)
                    memcache['queries'][key] = ids;
                }
                break;
        }
    }

    return { getCache, readFromQueryCache, setCache }
}

module.exports = cache();