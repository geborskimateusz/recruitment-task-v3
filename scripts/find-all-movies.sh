#!/bin/bash
curl --header "Content-Type: application/json" \
  --request GET \
   http://localhost:3000/api/movies/findAll 
   