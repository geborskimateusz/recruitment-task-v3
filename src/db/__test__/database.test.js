const { assert } = require('joi');
const { database } = require('../database');
const { assertGenres, assertRuntime } = require('../../test/custom-assertions')
const cache = require('../cache');

it('should find random on movie schema', async () => {
    const db = database('movies')
    const firstMovie = await db.findAny();
    expect(firstMovie).toBeDefined();

    const secondMovie = await db.findAny();
    expect(secondMovie).toBeDefined();

    expect(firstMovie).not.toEqual(secondMovie)
});

it('should find movie by filters', async () => {
    const db = database('movies')
    const genres = ['Comedy', 'Fantasy']
    const runtime = 120;

    const movies = await db.find({ runtime, genres })

    movies.forEach(movie => {
        assertGenres(genres, movie.genres)
        assertRuntime(movie.runtime)
    });
});

it('should create mew movie', async () => {
    const db = database('movies')

    let movie = {
        genres: [
            "Comedy",
            "Fantasy"
        ],
        title: "testmgi",
        year: 2001,
        runtime: 12,
        director: "12"
    };
    movie = await db.create(movie)
    expect(movie.id).toBeDefined()
});