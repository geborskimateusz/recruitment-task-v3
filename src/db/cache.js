const hash = require('../util/hash');

// In memory structure that holds queries that has been requested.
// It is used only when both genres and runtime query parameters were written.
// For example if there was a query like: 
// 
// api/movies/findAll/?runtime=90&genres=Comedy&genres=Fantasy
//
// It is hashed as a string and pushed into both queries and movies objects.
// First you need to check if such query exist in queries map. 
// Then if exist you will look into movies where result of query is mapped to generated hash
let memcache = {
    "genres": [],
    "movies": {},
    "queries": {}
};

function cache() {

    const getCache = () => memcache;

    const readFromQueryCache = queryKey => {
        const movieIds = memcache['queries'][queryKey];
        return movieIds.map(id => memcache['movies'][id]);
    };

    const setCache = (schema, result, filterParams) => {
        switch (schema) {
            case 'genres':
                if (memcache['genres'].length == 0) {
                    memcache['genres'] = result;
                }
                break;
            case 'movies':
                const ids = result.map(movie => {
                    memcache[schema][movie.id] = movie;
                    return movie.id;
                });

                if (filterParams) {
                    const key = hash.toHash(filterParams);
                    memcache['queries'][key] = ids;
                }
                break;
        }
    };

    return { getCache, readFromQueryCache, setCache };
}

module.exports = cache();