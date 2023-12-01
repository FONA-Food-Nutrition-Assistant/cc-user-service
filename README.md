# FONA USER SERVICE

FONA gateway service is a REST API that provides a gateway to the other FONA microservices.

## Features

- [x] Get User Data (GET)
- [x] Store User Data (POST)
- [x] Change/Alter User Data
- [x] Error Handling
- [x] Integrated with Database

## Service Endpoints

To access a service endpoint, you need to use the following format:

`METHOD /<BASE_URL>/<SERVICE_PREFIX>/<USER_SERVICE_ENDPOINT>`

```http
GET http://localhost:8080/api/v1/user
POST http://localhost:8080/api/v1/user
PUT http://localhost:8080/api/v1/user
```

With `fona-client-uid ` included in the header request.
