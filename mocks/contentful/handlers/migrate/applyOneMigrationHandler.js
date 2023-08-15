const { rest } = require('msw')
const { baseURL } = require('../../baseContentfulHandler')

const timestampPattern = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/
module.exports.applyOneMigrationHandler = [
    //initial request to get the applied migrations content type
    //will return 404 initially since it does not exist
    rest.get(`${baseURL}/environments/master/content_types/appliedMigrations`, (req, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json({
                sys: {
                    type: 'Error',
                    id: 'NotFound',
                },
                message: 'The resource could not be found.',
                details: {
                    type: 'ContentType',
                    id: 'appliedMigrations',
                    environment: 'master',
                    space: 'TEST_SPACE_ID',
                },
                requestId: '284d7c14-9b52-4655-aecb-2c6806e59106',
            }),
        )
    }),

    rest.get(`${baseURL}/environments/master/content_types`, (req, res, ctx) => {
        console.log('QUERY: ', req.url.searchParams)

        if (req.url.searchParams.get('sys.id[in]') === 'appliedMigrations') {
            return res(
                ctx.status(200),
                ctx.json({
                    sys: {
                        type: 'Array',
                    },
                    total: 0,
                    skip: 0,
                    limit: 100,
                    items: [],
                }),
            )
        }
    }),

    rest.put(`${baseURL}/environments/master/content_types/appliedMigrations`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                sys: {
                    space: {
                        sys: {
                            type: 'Link',
                            linkType: 'Space',
                            id: 'TEST_SPACE_ID',
                        },
                    },
                    id: 'appliedMigrations',
                    type: 'ContentType',
                    createdAt: '2023-07-14T09:24:22.833Z',
                    updatedAt: '2023-07-14T09:24:22.833Z',
                    environment: {
                        sys: {
                            id: 'master',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    createdBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    updatedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    publishedCounter: 0,
                    version: 1,
                },
                displayField: 'timestamp',
                name: 'Applied migrations',
                description: null,
                fields: [
                    {
                        id: 'timestamp',
                        name: 'Timestamp',
                        type: 'Symbol',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                    {
                        id: 'name',
                        name: 'Name',
                        type: 'Symbol',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                    {
                        id: 'batch',
                        name: 'Batch number',
                        type: 'Integer',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                ],
            }),
        )
    }),

    rest.put(`${baseURL}/environments/master/content_types/appliedMigrations/published`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                sys: {
                    space: {
                        sys: {
                            type: 'Link',
                            linkType: 'Space',
                            id: 'TEST_SPACE_ID',
                        },
                    },
                    id: 'appliedMigrations',
                    type: 'ContentType',
                    createdAt: '2023-07-14T09:24:22.833Z',
                    updatedAt: '2023-07-14T09:24:23.228Z',
                    environment: {
                        sys: {
                            id: 'master',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    createdBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    updatedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    publishedCounter: 1,
                    version: 2,
                    firstPublishedAt: '2023-07-14T09:24:23.228Z',
                    publishedAt: '2023-07-14T09:24:23.228Z',
                    publishedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    publishedVersion: 1,
                },
                displayField: 'timestamp',
                name: 'Applied migrations',
                description: null,
                fields: [
                    {
                        id: 'timestamp',
                        name: 'Timestamp',
                        type: 'Symbol',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                    {
                        id: 'name',
                        name: 'Name',
                        type: 'Symbol',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                    {
                        id: 'batch',
                        name: 'Batch number',
                        type: 'Integer',
                        localized: false,
                        required: true,
                        validations: [],
                        disabled: false,
                        omitted: false,
                    },
                ],
            }),
        )
    }),

    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        if (req.url.searchParams.get('limit') === '1000' && req.url.searchParams.get('content_type') === 'appliedMigrations') {
            return res(
                ctx.status(200),
                ctx.json({
                    sys: {
                        type: 'Array',
                    },
                    total: 0,
                    skip: 0,
                    limit: 1000,
                    items: [],
                }),
            )
        }
    }),

    rest.get(`${baseURL}/environments`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                total: 3,
                limit: 25,
                skip: 0,
                sys: {
                    type: 'Array',
                },
                items: [
                    {
                        name: 'test',
                        sys: {
                            type: 'Environment',
                            id: 'test',
                            version: 3,
                            space: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Space',
                                    id: 'TEST_SPACE_ID',
                                },
                            },
                            status: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Status',
                                    id: 'ready',
                                },
                            },
                            createdBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            createdAt: '2023-06-08T12:21:36Z',
                            updatedBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            updatedAt: '2023-06-08T12:21:36Z',
                            aliases: [],
                        },
                    },
                    {
                        name: '2023-07-14-09-12-23',
                        sys: {
                            type: 'Environment',
                            id: '2023-07-14-09-12-23',
                            version: 3,
                            space: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Space',
                                    id: 'TEST_SPACE_ID',
                                },
                            },
                            status: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Status',
                                    id: 'ready',
                                },
                            },
                            createdBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            createdAt: '2023-07-14T09:12:24Z',
                            updatedBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            updatedAt: '2023-07-14T09:12:24Z',
                            aliases: [
                                {
                                    sys: {
                                        type: 'Link',
                                        linkType: 'EnvironmentAlias',
                                        id: 'master',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        name: '2023-07-14-09-12-23',
                        sys: {
                            type: 'Environment',
                            id: 'master',
                            aliasedEnvironment: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Environment',
                                    id: '2023-07-14-09-12-23',
                                },
                            },
                            version: 3,
                            space: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Space',
                                    id: 'TEST_SPACE_ID',
                                },
                            },
                            status: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Status',
                                    id: 'ready',
                                },
                            },
                            createdBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            createdAt: '2023-07-14T09:12:24Z',
                            updatedBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            updatedAt: '2023-07-14T09:12:24Z',
                        },
                    },
                ],
            }),
        )
    }),

    //https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-07-14-12-33-54
    //wildcard endpoints to match PUT environment /DATE_TIME
    rest.put(`${baseURL}/environments/*`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                name: '2023-07-14-09-24-23',
                sys: {
                    type: 'Environment',
                    id: '2023-07-14-09-24-23',
                    version: 1,
                    space: {
                        sys: {
                            type: 'Link',
                            linkType: 'Space',
                            id: 'TEST_SPACE_ID',
                        },
                    },
                    status: {
                        sys: {
                            type: 'Link',
                            linkType: 'Status',
                            id: 'queued',
                        },
                    },
                    createdBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    createdAt: '2023-07-14T09:24:24Z',
                    updatedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    updatedAt: '2023-07-14T09:24:24Z',
                    aliases: [],
                },
            }),
        )
    }),

    //* intercepting GET request to https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-07-14-09-24-23/locales
    rest.get(`${baseURL}/environments/*/locales`, (req, res, ctx) => {
        //todo: not handled ? * intercepting GET request to https://api.contentful.com/spaces/bo6ijs14u5ox/environments/2023-07-14-09-24-23/locales?limit=100&order=sys.createdAt&skip=0

        return res(
            ctx.status(200),
            ctx.json({
                sys: {
                    type: 'Array',
                },
                total: 1,
                skip: 0,
                limit: 100,
                items: [
                    {
                        name: 'English (United States)',
                        internal_code: 'en-US',
                        code: 'en-US',
                        fallbackCode: null,
                        default: true,
                        contentManagementApi: true,
                        contentDeliveryApi: true,
                        optional: false,
                        sys: {
                            type: 'Locale',
                            id: '1VDLlb9oKX4EE2oI6p9kMa',
                            version: 1,
                            space: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Space',
                                    id: 'bo6ijs14u5ox',
                                },
                            },
                            environment: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Environment',
                                    id: '2023-07-14-09-24-23',
                                    uuid: '496f71bd-6cb5-49c7-8ddc-c9f857c1a212',
                                },
                            },
                            createdBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            createdAt: '2023-07-14T09:24:24Z',
                            updatedBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            updatedAt: '2023-07-14T09:24:24Z',
                        },
                    },
                ],
            }),
        )
    }),
    //wildcard endpoints to match GET environment /DATE_TIME
    rest.get(`${baseURL}/environments/*`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: '2023-07-14-09-24-23',
                sys: {
                    type: 'Environment',
                    id: '2023-07-14-09-24-23',
                    version: 3,
                    space: {
                        sys: {
                            type: 'Link',
                            linkType: 'Space',
                            id: 'TEST_SPACE_ID',
                        },
                    },
                    status: {
                        sys: {
                            type: 'Link',
                            linkType: 'Status',
                            id: 'ready',
                        },
                    },
                    createdBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    createdAt: '2023-07-14T09:24:24Z',
                    updatedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    updatedAt: '2023-07-14T09:24:25Z',
                    aliases: [],
                },
            }),
        )
    }),

    //* Found an unhandled GET request to https://api.contentful.com/spaces/TEST_SPACE_ID/api_keys
    rest.get(`${baseURL}/api_keys`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                total: 1,
                limit: 25,
                skip: 0,
                sys: {
                    type: 'Array',
                },
                items: [
                    {
                        name: 'Example space token 1',
                        description: 'This token is used by an example app. It is coupled with the content previews.',
                        accessToken: 'c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045',
                        policies: [
                            {
                                effect: 'allow',
                                actions: 'all',
                            },
                        ],
                        sys: {
                            type: 'ApiKey',
                            id: '1Yrt2lSOGbwEjPWJVg6yJA',
                            version: 86,
                            space: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'Space',
                                    id: 'TEST_SPACE_ID',
                                },
                            },
                            createdBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            createdAt: '2018-09-17T08:26:09Z',
                            updatedBy: {
                                sys: {
                                    type: 'Link',
                                    linkType: 'User',
                                    id: '7fkm1bGT9u8nLkbD7Uuqsr',
                                },
                            },
                            updatedAt: '2023-07-14T09:12:25Z',
                        },
                        environments: [
                            {
                                sys: {
                                    id: 'master',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-02-08-50-46',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-11-14-05',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-11-18-44',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-11-19-09',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-11-19-33',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-08-11',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-09-36',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-13-09',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-21-53',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-25-50',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-29-49',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-30-33',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-30-50',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-35-27',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-12-58-23',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-10-01',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-10-44',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-12-01',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-12-19',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-12-46',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-13-12',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-14-12',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-18-45',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-33-50',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-35-12',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-35-50',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-36-46',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-38-59',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-40-09',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-40-30',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-52-54',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-14-53-49',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-03-45',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-04-30',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-14-56',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-15-34',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-24-35',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-25-05',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-25-47',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-38-32',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-51-32',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-56-58',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-57-36',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-15-59-18',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-16-02-06',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-16-02-58',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-16-05-53',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-05-16-07-40',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-07-07-23-21',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-07-07-23-46',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-07-08-05-31',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-07-08-38-35',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-08-08-08-37',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-08-08-08-56',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-15-50',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-16-29',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-17-53',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-18-54',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-19-15',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-22-38',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-26-32',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-12-56-57',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-13-49-12',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-13-52-52',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-09-13-53-47',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-14-08-27-25',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-13-46-48',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-14-05-43',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-14-07-29',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-14-11-02',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-14-12-01',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-26-14-12-36',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-27-08-53-00',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-28-07-02-37',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-28-11-32-12',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-28-11-32-44',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-28-11-33-42',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-28-11-35-08',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-29-08-45-03',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-06-29-08-45-20',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: 'test-env',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-07-14-08-51-57',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-07-14-09-11-59',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                            {
                                sys: {
                                    id: '2023-07-14-09-12-23',
                                    type: 'Link',
                                    linkType: 'Environment',
                                },
                            },
                        ],
                        preview_api_key: {
                            sys: {
                                type: 'Link',
                                linkType: 'PreviewApiKey',
                                id: '1YsyWIrKbsWrbImKsd9Bqq',
                            },
                        },
                    },
                ],
            }),
        )
    }),

    //wildcard for dynamic api key
    rest.put(`${baseURL}/api_keys/1Yrt2lSOGbwEjPWJVg6yJA`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: 'Example space token 1',
                description: 'This token is used by an example app. It is coupled with the content previews.',
                accessToken: 'c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045',
                policies: [
                    {
                        effect: 'allow',
                        actions: 'all',
                    },
                ],
                sys: {
                    type: 'ApiKey',
                    id: '1Yrt2lSOGbwEjPWJVg6yJA',
                    version: 87,
                    space: {
                        sys: {
                            type: 'Link',
                            linkType: 'Space',
                            id: 'TEST_SPACE_ID',
                        },
                    },
                    createdBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    createdAt: '2018-09-17T08:26:09Z',
                    updatedBy: {
                        sys: {
                            type: 'Link',
                            linkType: 'User',
                            id: '7fkm1bGT9u8nLkbD7Uuqsr',
                        },
                    },
                    updatedAt: '2023-07-14T09:24:25Z',
                },
                environments: [
                    {
                        sys: {
                            id: 'master',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-02-08-50-46',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-11-14-05',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-11-18-44',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-11-19-09',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-11-19-33',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-08-11',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-09-36',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-13-09',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-21-53',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-25-50',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-29-49',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-30-33',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-30-50',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-35-27',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-12-58-23',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-10-01',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-10-44',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-12-01',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-12-19',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-12-46',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-13-12',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-14-12',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-18-45',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-33-50',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-35-12',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-35-50',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-36-46',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-38-59',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-40-09',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-40-30',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-52-54',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-14-53-49',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-03-45',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-04-30',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-14-56',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-15-34',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-24-35',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-25-05',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-25-47',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-38-32',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-51-32',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-56-58',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-57-36',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-15-59-18',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-16-02-06',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-16-02-58',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-16-05-53',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-05-16-07-40',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-07-07-23-21',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-07-07-23-46',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-07-08-05-31',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-07-08-38-35',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-08-08-08-37',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-08-08-08-56',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-15-50',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-16-29',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-17-53',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-18-54',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-19-15',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-22-38',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-26-32',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-12-56-57',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-13-49-12',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-13-52-52',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-09-13-53-47',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-14-08-27-25',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-13-46-48',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-14-05-43',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-14-07-29',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-14-11-02',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-14-12-01',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-26-14-12-36',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-27-08-53-00',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-28-07-02-37',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-28-11-32-12',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-28-11-32-44',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-28-11-33-42',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-28-11-35-08',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-29-08-45-03',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-06-29-08-45-20',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: 'test-env',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-07-14-08-51-57',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-07-14-09-11-59',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-07-14-09-12-23',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                    {
                        sys: {
                            id: '2023-07-14-09-24-23',
                            type: 'Link',
                            linkType: 'Environment',
                        },
                    },
                ],
                preview_api_key: {
                    sys: {
                        type: 'Link',
                        linkType: 'PreviewApiKey',
                        id: '1YsyWIrKbsWrbImKsd9Bqq',
                    },
                },
            }),
        )
    }),

    rest.delete(`${baseURL}/environments/*`, (req, res, ctx) => {
        return res(ctx.status(204))
    }),
]
