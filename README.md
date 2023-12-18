# 🔗 FONA's Food Service

`This food service provides users to securely store, update, and retrieve their information`

💡 The `main idea` of this service is to provide users to manage their information

🎯 The primary goal of this service is to store, update, and retrieve users data to database based on their UID

## Features

- ✅ Store the User's Data
- ✅ Update the User's Data
- ✅ Retrieve the User's Data
  `✅ : Completed | ❌ : Not Completed | ⚒️ : In Progress`

## Technologies and Libraries

- ✅ [`NodeJS`](https://nodejs.org/) - JavaScript runtime environment to run the service
- ✅ [`NestJS`](https://nestjs.com/) - NodeJS framework used to facilitate the service development
- ✅ [`PostgreSQL`](https://www.postgresql.org/) - Database to store the foods and nutritions data
- ✅ [`Github Actions`](https://docs.github.com/en/actions) - Used for the development and production workflows

`✅ : Completed | ❌ : Not Completed | ⚒️ : In Progress`

## Project Structure

```
.
├── Dockerfile
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── common
│   │   ├── const
│   │   │   └── ... (consts)
│   │   ├── db
│   │   │   └── run-in-transaction.ts
│   │   ├── enum
│   │   │   └── ... (enums)
│   │   ├── filter
│   │   │   └── ... (exceptions)
│   │   ├── interceptor
│   │   │   └── ... (interceptors)
│   │   ├── message
│   │   │   └── ... (messages)
│   │   └── middleware
│   │       └── ... (middlewares)
│   ├── config
│   │   └── global.config.ts
│   ├── main.ts
│   ├── module
│   │   └── user
│   │       ├── dto
│   │       │   └── ... (DTOs)
│   │       ├── entities
│   │       │   └── ... (entities)
│   │       ├── models
│   │       │   └── ... (models)
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       └── user.service.ts
│   └── util
│       └── ... (helpers)
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

| Directory      | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| `consts`       | Contains constant values used throughout the service                  |
| `enums`        | Houses enumerations, defining sets of named constant values           |
| `exceptions`   | Stores custom exception classes or error handling functionalities.    |
| `interceptors` | Holds code for intercepting and manipulating HTTP requests/responses. |
| `messages`     | Contains messages for error handling purposes                         |
| `middleware`   | Contains middleware for authentication and logging                    |
| `DTOs`         | Stores Data Transfer Objects used for communication between layers.   |
| `entites`      | Houses core business objects representing data structures.            |
| `models`       | Contains data models representing entities within the service         |
| `helpers`      | Houses utility functions or classes                                   |

## Deployment Stages

![Deployment Stages](image.png)
