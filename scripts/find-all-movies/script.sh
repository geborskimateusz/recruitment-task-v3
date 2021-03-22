#!/bin/bash
# If we don't provide any parameter, then it should return a single random movie.


curl -o response.json --header "Content-Type: application/json" \
  --request GET \
   http://localhost:3000/api/movies/findAll
   