const request = require("supertest");
import { app } from "../../server";
import { Movie } from "../../domain/movie";
const { assertErrorMessage } = require("../../test/custom-assertions");

const postMovie = async (requestBody: Movie, statusCode: number) => {
  return request(app).post("/api/movies").send(requestBody).expect(statusCode);
};

it("validation fails on invalid movie body", async () => {
  let statusCode = 400;
  let requestBody = {} as Movie;

  let response = await postMovie(requestBody, statusCode);
  assertErrorMessage(response.body, '"title" is required');

  requestBody.title = "test";
  response = await postMovie(requestBody, statusCode);
  assertErrorMessage(response.body, '"year" is required');

  requestBody.year = 2001;
  response = await postMovie(requestBody, statusCode);
  assertErrorMessage(response.body, '"runtime" is required');

  requestBody.runtime = 120;
  response = await postMovie(requestBody, statusCode);
  assertErrorMessage(response.body, '"director" is required');

  requestBody.director = "Any Director";
  response = await postMovie(requestBody, statusCode);

  requestBody.genres = ["InvalidGenre"];
  response = await postMovie(requestBody, statusCode);
  assertErrorMessage(response.body, "Missing genres InvalidGenre");
});

it("returns 400 when validation fails", async () => {
  let statusCode = 400;
  let requestBody = {} as Movie;
  await postMovie(requestBody, statusCode);
});

it("retuns 201 when created", async () => {
  let statusCode = 201;
  let requestBody: Movie = {
    genres: ["Comedy", "Fantasy"],
    title: "testmgi",
    year: 2001,
    runtime: 12,
    director: "Any",
  };
  await postMovie(requestBody, statusCode);
});
