#!/bin/bash
# If we provide only genres parameter, then it should return all movies that contain
# at least one of the specified genres. Also movies should be orderd by a number of genres that match.
# For example if we send a request with genres [Comedy, Fantasy, Crime] then the top
# hits should be movies that have all three of them, then there should be movies
# that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

curl -o response.json --header "Content-Type: application/json" \
  --request GET \
   http://localhost:3000/api/movies/findAll/?genres=Comedy&genres=Fantasy
   