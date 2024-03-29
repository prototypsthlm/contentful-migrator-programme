# Contentful Migrator Programme
Tool to manage Contentful migrations

## Setup

### Install package

```shell script
npm i --save @prototyp-stockholm/contentful-migrator-programme
```

### Prepare a Contentful space

Get an API Key for migrations (`CTF_CMA_TOKEN`) under `Settings -> API Keys -> Content management` tokens in your Contentful space.

Create an environment under `Settings -> Environments`.

### Create a configuration file

Create a `.env` file in your project root and add these variables:

#### Required variables
```dotenv
CTF_SPACE_ID=<SECRET>       # The Contentful space id
CTF_ENVIRONMENT_ID=<SECRET>    # The name of the Contentful environment
CTF_CMA_TOKEN=<SECRET>      # The Content Management API token
```

#### Optional variables
```dotenv
MIGRATIONS_DIR=migrations                        # A relative path to the directory where CMP will store migration script files
APPLIED_MIGRATIONS_TYPE_ID=appliedMigrations     # The content type id used to store applied migration entries  
MAX_NUMBER_OF_ALIASES=1                          # The number of allowed aliases in this Contentful space
MAX_NUMBER_OF_ENVIRONMENTS=4                     # The number of allowed environments in this Contentful space
NUMBER_OF_RETRIES_WHEN_CREATING_ENVIRONMENT=10   # Number of retries when creating an environment
```


## Usage

An example migration with `up` and `down` functions:

```javascript
module.exports.up = (migration, context) => {
    const dog = migration.createContentType('dog').name('Dog').displayField('name')
    dog.createField('name').type('Symbol').name('Name')
}

module.exports.down = (migration, context) => {
    // Note: If you already have content with type dog you'll have to remove all dog entries, before removing the dog type
    migration.deleteContentType('dog')
}
```

If you did not install the package globally you'll have to prepend `node_modules/.bin/` to the `cmp` command.

Otherwise, you can add the `cmp` command in the scripts section of the project `package.json`.

Then you can use it like so: `npm run cmp`.

```json
{
    "scripts": {
        "cmp": "cmp"
    }
}
```

Read more on migration syntax on https://github.com/contentful/contentful-migration

### Available commands


#### `cmp generate <migrationName>`
Generates a migration with the given name and a timestamp prepended ex: YYYYMMDDhhmmssxxx-add-user-type.js.

#### `cmp migrate`
Applies all _up_ operations of the non applied migrations to the CTF_ENVIRONMENT_ID set in the `.env` file

#### `cmp rollback`
Applies the _down_ operations (i.e rolls back ) of the latest migration batch

#### `cmp aux:create <name?>`
Creates an aux environment based on CTF_ENVIRONMENT_ID. You can give it an optional name.

#### `cmp aux:drop <name>`
Drop the environment with the given name

#### `cmp aux:test`
Creates environment from CTF_ENVIRONMENT_ID, applies new migrations, and drops the environment


## For development of the CMP tool

1. Clone this project
2. `npm i`
3. `npm link`
4. Create a test project in another folder and cd into it
5. `npm init`
6. `npm i @prototyp-stockholm/contentful-migrator-programme`
7. `npm link @prototyp-stockholm/contentful-migrator-programme`
8. create an .env file and set the required CTF credentials

Now anything you modify in the locally cloned package will be instantly available in the test project to test.

## Testing

We use `Jest` for testing. Before the tests are run setup in `jest.setupFiles.js` and `jestSetupFilesAfterEnv.js` are being performed.

`jest.setupFiles.js` overrides the .env file with the .env.test file. It also creates a utility mock of `console.log` to capture all console output but without any encoding characters from picocolor. 

`jestSetupFilesAfterEnv.js` creates a test migration directory before the test suite is executed. The directory is removed after the test suite is executed.

Before running the tests you need to create a `.env.test` file in the root of the project. Create a copy from `.env.test.template`

Since the codebase is integrated with the `contenful-management` package we use a mock their api by using `mock service worker`. The mocks can be found in `mocks/contentful`. The `handlers` directory contains response handlers corresponding for each command in `cmd.js`

## Roadmap
- [x]  Track migrated migrations with a migration type
- [x]  Generate migration command.
- [x]  Apply migrations command.
- [x]  Reset current environment to master.
- [x]  Rollback the latest migration
- [ ]  Apply migrations in batches and ability to rollback if something goes wrong (aux env).
- [ ]  When migrating, all migrations will belong to a batch. When rolling back, the latest batch will be reverted.
- [ ]  Improve migrations templates (add ability to use `npm run m:generate add-name-to-user-type --name=Symbol --age=Number` for example and generate the needed code to add the fields.
- [ ]  Improve seeding or maybe rethink it or maybe remove it since it may be out of scope.
- [ ]  Move to TypeScript.
- [ ]  Document features.

## Releasing and publishing on NPM

Release-please is utilized to simplify releases and to auto-publish on NPM. In short, release-please creates a release-PR that updates the version and edits the Changelog as soon as it detects new commits with messages starting with "fix" or "feat". This PR is maintained until it is merged. Upon merging, this packages is released and once done it auto-publishes on NPM. 

Read more here https://github.com/google-github-actions/release-please-action#how-release-please-works
