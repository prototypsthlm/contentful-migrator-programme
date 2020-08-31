# contentful-migrator-programme
Tool to manage contentful migrations

## Migrations

```shell script
# Generate a migration
yarn m:generate addUserType
# This will generate a migration with the name YYYYMMDDhhmmssxxx-add-user-type.js

# Apply migration
yarn m:apply
# This will apply the migration to the branch set in the CTF_ENVIRONMENT env var

# Test migrations
yarn m:aux:create
# This will generate an aux env based on CTF_ENVIRONMENT and apply the migrations so they can be tested.
# Update the CTF_ENVIRONMENT with the testEnv created and printed out by that command to be able to test
# the app. And remember to drop it when done with the m:aux:drop command.
#
# Would be great to set the aux env name manually, and create a file with the env name stored, that if present, the project uses that env

# Drop aux env after testing (migrations will be applied in ctf master env by the ci)
yarn m:aux:drop test20200220233122
# remember to revert back CTF_ENVIRONMENT to the original value after reverting.
```
