# Tracking app (backend)

Application to track a user hikes. Built using Node and MongoDB during a course.
Check [Tracker Mobile](https://github.com/dzvid/tracker-mobile) for the mobile
client built using React Native.

## Running the project

```sh
1 - Install dependencies, run:

yarn

2 - Create a `.env` file for the environment variables, check `.env.example` for
a example. Then insert and set the following values in the file:

# App
NODE_ENV=development
PORT=3000

# Mongo
MONGO_URL=

#Auth JWT
APP_SECRET=
APP_TOKEN_EXPIRES_IN=7d

2 - Execute backend in development mode, run:

yarn dev
```
