# Typescript Express API Starter

## Installation

In order to use this API, simply fork the repo, clone it to
your local machine, change the upstream remote origin, and
start making changes.

## Usage

A file with the name `.env` _**must**_ exist at the project
root in order to run this project locally, in CI, and in a
deployed environment. The `.env` must follow the pattern
below:

```env
DATABASE_USER=postgres # this is usually `$(whoami)` when not using Docker
DATABASE_PASSWORD=password # this cannot be left empty; this variable is also used in docker-compose.yml
DATABASE_HOST=ts_express_api # this can be changed to whatever
FIREBASE_PROJECT_ID=<PROJECT_ID> # retrieve Firebase info from Admin Panel
FIREBASE_CLIENT_EMAIL=foo@<PROJECT_ID>.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n
FIREBASE_DATABASE_URL=https://<DATABASE_NAME>.firebaseio.com
# Do not add a PORT variable to this file.
```

Decide the database username and password before continuing
on to the next step.

### Locally (without Docker)

Follow the instructions on [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
on how to set up PostgreSQL for the application. For MacOS
users, simply use Homebrew to install and set up.

Once Postgres is set up, run the following command:

```bash
# yarn
yarn knex migrate:latest

# npm
npm run knex migrate:latest
```

You can then run the server with `yarn start`, and hit the
API with some `curl` commands. All available API endpoints
with sample data will be written in the individual projects'
Wiki, or through auto-generated documentation. In the
meantime, just take a peek at `src/controllers/` to get to
know the stack.

### Locally (with Docker)

```bash
# yarn
yarn up:b # rebuilds the image every time
# or
yarn up # starts the services without a rebuild

# npm
npm run up:b
# or
npm run up
```

## Stack

- TypeScript
  - Express (HTTP API server)
  - Objection (Database ORM)
  - Celebrate (Payload and query validation)
  - FirebaseAdmin (JWT authentication)
  - Nodemon (Development server watcher)
  - Jest (Test runner suite)
- PostgreSQL

## Directory structure

All of the project lives in the `src/` directory. Anything
top-level should be purely project configuration.

```bash
src/
  config/                 # application configuration; not project config
  controllers/            # core route endpoint logic (uses classes from `lib`)
    {subject}/            # Singular subject from `lib`
      {verb}.ts           # The route endpoint itself
      {verb}.spec.ts      # Route test file (e.g. tests creating a user, etc.) (do not implement yet)
  helpers/                # reusable, modular helper methods
  lib/                    # core services and validators
    {subject}s/           # A plural noun (users, roles, etc.)
      {verb}/             # GET, PUT, POST, PATCH, DELETE, etc.
        validator.spec.ts # Validator test file
        validator.ts      # Celebrate validator used in controller validation options
      crud.spec.ts        # the crud test file
      crud.ts             # the create, read, update, delete methods
      service.spec.ts     # Service test file
      service.ts          # exports {Subject}sService class (methods are static); the roadmaps of steps
  middlewares/            # route middleware logic
  migrations/             # database migrations
  models/                 # model schemas, errors, and relation mappings (don't use Objection validation)
  server.ts               # the server itself
  index.ts                # application entrypoint (master-slave configuration)
```

## Testing

Documentation will come shortly. At this time, Knex is just
broken. Running the Jest watcher while attempting to clean
the database after each test run just throws the following
error:

```bash
Cannot read property `raw` of undefined
```

Knex... Knex is apparently undefined. You can read more
about it [here](https://github.com/tgriesser/knex/issues/2725)

Specifying a `volumes` in the docker-compose-test.yaml file
also causes the tests to run very, very slowly. Just ignore
this field altogether.

- TODO: figure out a way to properly exit the test suite
  without using `process.exit`, even though it does return
  the proper result code.

Until knex gets fixed, before running the test suite in
Docker, you will need to clear the database by running:

```bash
yarn down
```

From there, you can run the test suite with:

```bash
yarn test # Locally (requires local Postgres instance)
yarn up:test # Docker
```

## Additional notes

- [knex@0.16.4-next2](https://github.com/tgriesser/knex/issues/2998#issuecomment-472631411)
  has broken TypeScript support. Until this gets fixed,
  stay on `0.15.2` (which has broken Promise support).
- Use the following for validating a JWT:
  - `Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, "JWT")`
