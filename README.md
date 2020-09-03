# Contentful Migrator Programme

Tool to manage Contentful migrations

## Setup

### Install package

```shell script
npm i --save @prototyp-stockholm/contentful-migrator-programme
```

### Prepare contentful space

Get an API Key for migrations (`CTF_CMA_TOKEN`) under `Settings -> API Keys -> Content management` tokens in your Contentful space.

Create an environment under `Settings -> Environments`.

### Set environment variables

Create a `.env` file in your project root and add those variables:

```dotenv
# required
CTF_SPACE=<SECRET>
CTF_ENVIRONMENT=<SECRET>
CTF_CMA_TOKEN=<SECRET>

# optional
MIGRATIONS_DIR=migrations
MIGRATIONS_TYPE=migrations
ALIAS_AMOUNT=1
ENV_AMOUNT=3
```

## Usage

An example migration with up and down function:

```javascript
module.exports.up = (migration, context) => {
    const dog = migration.createContentType('dog').name('Dog').displayField('name')
    dog.createField('name').type('Symbol').name('Name')
}

module.exports.down = (migration, context) => {
    // Note: If you already have content with type dog you'll have to remove that content before removing the dog type
    migration.deleteContentType('dog')
}
```

Read more on migration syntax on https://github.com/contentful/contentful-migration

### Available commands

```shell script
cmp generate <migrationName> # generates a migration with the given name and a timestamp prepended ex: YYYYMMDDhhmmssxxx-add-user-type.js.
cmp migrate # applies all _up_ operations of the non applied migrations to the CTF_ENVIRONMENT set in the `.env` file
cmp rollback # applies the _down_ operation of the latest migration
cmp aux:create <name?> # creates an aux env based on CTF_ENVIRONMENT. You can give it an optional name.
cmp aux:drop <name> # drop the env with the given name
cmp aux:test # creates env from CTF_ENVIRONMENT, applies new migrations, and drops the env
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

## Develop

1. Clone this project
2. run npm i
3. run npm link
4. create a test project in another folder and cd into it
5. run npm init
6. run npm i @prototyp-stockholm/contentful-migrator-programme
7. run npm link @prototyp-stockholm/contentful-migrator-programme
8. create an .env file and set the required CTF credentials

Now anything you modify in the locally cloned package will be instantly available in the test project to test.


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
