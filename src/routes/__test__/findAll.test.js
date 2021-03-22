const request = require('supertest');
const { app } = require('../../server');
const { assertGenres, assertRuntime } = require('../../test/custom-assertions');

it('returns different random movies when query paramters not supplied', async () => {
    let response = await request(app)
        .get('/api/movies/findAll')
        .send()
        .expect(200);

    const firstRandom = response.body;

    response = await request(app)
        .get('/api/movies/findAll')
        .send()
        .expect(200);

    const secondRandom = response.body;

    expect(firstRandom).not.toEqual(secondRandom);

});

it('returns movies with range +/-10 runtime', async () => {
    const runtime = 120;
    const response = await request(app)
        .get(`/api/movies/findAll/?runtime=${runtime}`)
        .send()
        .expect(200);

    const movies = response.body;

    movies.forEach(movie => {
        assertRuntime(movie.runtime);
    });

});

it('returns movies with supplied genres', async () => {
    const genres = ['Comedy', 'Fantasy'];

    const response = await request(app)
        .get(`/api/movies/findAll/?genres=${genres[0]}&genres=${genres[1]}`)
        .send()
        .expect(200);

    const movies = response.body;

    movies.forEach(movie => {
        assertGenres(genres, movie.genres);
    });

});

it('returns movies with supplied genres with range +/-10 runtime', async () => {
    const genres = ['Comedy', 'Fantasy'];
    const runtime = 120;

    const response = await request(app)
        .get(`/api/movies/findAll/?runtime=${runtime}&genres=${genres[0]}&genres=${genres[1]}`)
        .send()
        .expect(200);

    const movies = response.body;

    movies.forEach(movie => {
        assertGenres(genres, movie.genres);
        assertRuntime(movie.runtime);
    });

});