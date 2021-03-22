#!/bin/bash
# If we provide only duration parameter, then it should return a single random movie that has a runtime between <duration - 10> and <duration + 10>.

curl -o response.json --header "Content-Type: application/json" \
  --request GET \
   http://localhost:3000/api/movies/findAll?runtime=120
   