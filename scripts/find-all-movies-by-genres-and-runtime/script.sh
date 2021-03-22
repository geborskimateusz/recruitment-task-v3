#!/bin/bash
# If we provide both duration and genres parameter, then we should get
# the same result as for genres parameter only, but narrowed by a runtime. 
#So we should return only those movies that contain at least one of the specified genres 
# and have a runtime between <duration - 10> and <duration + 10>.

curl -o response.json --header "Content-Type: application/json" \
  --request GET \
   http://localhost:3000/api/movies/findAll/?runtime=120&genres=Comedy&genres=Fantasy 
   