const request = require('supertest');
const { app } = require('../../server');
const { assertErrorMessage } = require('../../test/custom-assertions');

const postMovie = async (requestBody, statusCode) => {
    return request(app)
        .post('/api/movies')
        .send(requestBody)
        .expect(statusCode);
};

it('validation fails on invalid movie body', async () => {
    let statusCode = 400;
    let requestBody = {};

    let response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"title" is required');

    requestBody.title = "test";
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"year" is required');

    requestBody.year = "2001";
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"year" must be a number');

    requestBody.year = 2001;
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"runtime" is required');

    requestBody.runtime = "120";
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"runtime" must be a number');

    requestBody.runtime = 120;
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"director" is required');

    requestBody.director = 120;
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, '"director" must be a string');

    requestBody.director = "any";
    response = await postMovie(requestBody, statusCode);

    requestBody.genres = ['InvalidGenre'];
    response = await postMovie(requestBody, statusCode);
    assertErrorMessage(response.body, 'Missing genres InvalidGenre');

});

it('returns 400 when validation fails', async () => {
    let statusCode = 400;
    let requestBody = {};
    await postMovie(requestBody, statusCode);
});

it('retuns 201 when created', async () => {
    let statusCode = 201;
    let requestBody = {
        genres: [
            "Comedy",
            "Fantasy"
        ],
        title: "testmgi",
        year: 2001,
        runtime: 12,
        director: "12"
    };
    await postMovie(requestBody, statusCode);
});



