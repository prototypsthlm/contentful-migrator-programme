# contentful-migrator-programme
Tool to manage contentful migrations

## Migrations

Local environment must always use `dev` CTF_ENVIRONMENT. In web and in backend.

The flow should be to create a migration with the `m:generate` command, and then apply created migrations with the `m:apply` command.

Run `m:reset` if you need to rollback `m:apply` when locally testing the migrations. This will remove the current `dev` env and re-create a new one with the same name (`dev`) cloning from master.

```shell script
# Generate a migration
yarn m:generate addUserType
# This will generate a migration with the name `YYYYMMDDhhmmssxxx-add-user-type.js`.

# Apply migration
yarn m:apply
# This will apply the migration to the branch set in the `CTF_ENVIRONMENT` env var.

# Reset current env
yarn m:reset
# This will reset the current env to be a clone from master env.
```
