# Contentful Migrator Programme
Tool to manage Contentful migrations


## Setup

### Install package

```shell script
npm i --save @prototyp-stockholm/contentful-migrator-programme
```

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

### Available commands

```shell script
cmp generate <migrationName> # generates a migration with the given name and a timestamp prepended ex: YYYYMMDDhhmmssxxx-add-user-type.js.
cmp apply # applies all non applied migrations to the CTF_ENVIRONMENT set in the `.env` file
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
