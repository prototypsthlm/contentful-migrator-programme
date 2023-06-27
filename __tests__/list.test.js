const {setupMockedContentfulApi, closeMockedContentfulApi} = require("../mocks/contentful/baseContentfulHandler");
const {handler: listCommand} = require("../bin/commands/list");
const {extractLogLinesFromConsole} = require("../__test-utils__/log");
const {listOneMigrationAppliedHandler} = require("../mocks/contentful/handlers/list/oneAppliedMigrationsHandler");
const {listNoAppliedMigrationHandler} = require("../mocks/contentful/handlers/list/noAppliedMigrationsHandler");
const {createSimpleMigrationFile} = require("../__test-utils__/create-migration");
const {readdirSync} = require("fs");

describe('list', () => {
    //setupMockedContentfulApi(defaultHandler)
    it('should log that no migrations are applied', async () => {
        setupMockedContentfulApi(listNoAppliedMigrationHandler)
        numberOfMigrationsInMigrationsDir = readdirSync(process.env.MIGRATIONS_DIR).length;
        expect(numberOfMigrationsInMigrationsDir).toBe(0)

        const stdout = extractLogLinesFromConsole();
        await listCommand()
        expect(stdout).toContain("Found no applied migrations")
        closeMockedContentfulApi()
    });

    it('should log that migrations are applied', async () => {
        setupMockedContentfulApi(listOneMigrationAppliedHandler)

        //todo: use the actual generate code to create the file
        createSimpleMigrationFile()
        numberOfMigrationsInMigrationsDir = readdirSync(process.env.MIGRATIONS_DIR).length;
        expect(numberOfMigrationsInMigrationsDir).toBe(1)

        const stdout = extractLogLinesFromConsole();
        await listCommand()
        expect(stdout).toContain("Applied migrations:")
        expect(stdout).toContain("20230609122547608 - new-migration")
        closeMockedContentfulApi()
    });
})

