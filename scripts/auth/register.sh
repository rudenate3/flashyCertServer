#!/bin/bash

curl "http://localhost:3000/register" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
      "username":"'"${HANDLE}"'",
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
  }'

echo
