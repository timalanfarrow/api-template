# Typescript Express API Starter

## Installation

In order to use this API, simply fork the repo, clone it to
your local machine, change the upstream remote origin, and
start making changes.

## Usage

## .env

A file with the name `.env` _**must**_ exist at the project
root in order to run this project locally, in CI, and in a
deployed environment. The `.env` must follow the pattern
below:

```env
DATABASE_USER=postgres # this is usually `$(whoami)` when not using Docker
DATABASE_PASSWORD=password # this cannot be left empty; this variable is also used in docker-compose.yml
DATABASE_HOST=ts_express_api # this can be changed to whatever
DATABASE_NAME=postgres # this can be changed to whatever also
# Do not add a PORT variable to this file.
```

Decide the database username and password before continuing
on to the next step.

### service-account.json

In order to use this template, you will need to get a
personal `service-account.json` from Firebase. Place this
file in `./src/config/`.

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

Make sure your `.env` has the proper variables for local,
staging, and remote (Firebase test support coming soon).

### Local testing (without Docker)

Simply run the following:

```bash
# yarn
yarn test

# npm
npm test
```

### Local testing (with Docker)

```bash
# yarn
yarn up:test

#npm
npm run up:test
```

### Staging

Use this purely in the CI; get the IP address and password
of the Google Cloud Platform database assigned to this
project, and set them to their respective environment
variables. Then run the following:

```bash
# yarn
yarn test:ci

# npm
npm run test:ci
```

This will run a coverage report based on the Jest tests,
and saves them to the `coverage/` directory in the CI
container. You can then use this information with a
coverage reporter, such as [CodeClimate](https://codeclimate.com/).

A coverage reporter tool can provide insight to the overall
maintainability of the code, as well as areas of code that
either haven't been tested, or exposes areas of code that
are unreachable. All this to say, it enables greater code
confidence.

## Additional notes

- [knex@0.16.4-next2](https://github.com/tgriesser/knex/issues/2998#issuecomment-472631411)
  has broken TypeScript support. Until this gets fixed,
  stay on `0.15.2` (which has broken Promise support).
- Use the following for validating a JWT:
  - `Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, "JWT")`
