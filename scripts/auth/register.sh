#!/bin/bash

curl "http://localhost:3000/register" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
      "username":"'"${USERNAME}"'",
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
  }'

echo
