#!/bin/bash
curl -o response.json --header "Content-Type: application/json" \
  --request POST \
  --data '{"genres": ["Comedy", "Fantasy"], "title": "test", "year": 2001, "runtime": 12, "director": "12"}' \
   http://localhost:3000/api/movies
   