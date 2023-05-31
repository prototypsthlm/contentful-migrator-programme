
/*
const migration = {
    up(migration, context) {
        const populationCategories = migration
            .createContentType('populationCategories')
            .name('Population categories')
            .description('')
            .displayField('populationId')

        populationCategories
            .createField('populationId')
            .name('Population id')
            .type('Symbol')
            .localized(false)
            .required(true)
            .validations([
                {
                    unique: true,
                },
            ])
            .disabled(false)
            .omitted(false)
    },
    down(migration, context) {
        migration.deleteContentType('populationCategories')
    },
    test() {
        log.info("CALLING TEST")
    }
}

export { migration };*/

module.exports.up = (migration, context) => {
//const up = (migration, context) => {
 //log.info("UP")
    const populationCategories = migration
        .createContentType('populationCategories')
        .name('Population categories')
        .description('')
        .displayField('populationId')

    populationCategories
        .createField('populationId')
        .name('Population id')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([
            {
                unique: true,
            },
        ])
        .disabled(false)
        .omitted(false)
}

module.exports.down = (migration, context) => {
//const down = (migration, context) => {
//log.info("DOWN")
migration.deleteContentType('populationCategories')
}



//export {up, down}
