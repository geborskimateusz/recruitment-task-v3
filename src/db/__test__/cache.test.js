const cache = require('../cache');
const hash = require('../../util/hash');

it('should write movie to cache than read data by query hash', () => {
    const schema = 'movies';
    const result = [
        {
            id: 120,
            genres: [
                "Comedy",
                "Fantasy"
            ],
            title: "testmgi",
            year: 2001,
            runtime: 12,
            director: "12"
        }
    ];
    const filter = {
        runtime: 120,
        genres: [
            "Comedy",
            "Fantasy"
        ]
    };

    cache.setCache(schema, result, filter);

    const key = hash.toHash(filter);
    const cachedData = cache.readFromQueryCache(key);

    expect(cachedData.length).toBe(1);
    expect(cachedData[0]).toBe(result[0]);
});