const { rest } = require('msw')
const { baseURL } = require('../../baseContentfulHandler')

module.exports.listOneMigrationAppliedHandler = [
    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(body))
    }),
]

const body = {
    sys: {
        type: 'Array',
    },
    total: 3,
    skip: 0,
    limit: 1000,
    items: [
        {
            metadata: {
                tags: [],
            },
            sys: {
                space: {
                    sys: {
                        type: 'Link',
                        linkType: 'Space',
                        id: 'TEST_SPACE_ID',
                    },
                },
                id: 'KIDj4LUFhTnEqWE3vEaGa',
                type: 'Entry',
                createdAt: '2023-06-26T14:12:42.866Z',
                updatedAt: '2023-06-26T14:12:43.400Z',
                environment: {
                    sys: {
                        id: 'master',
                        type: 'Link',
                        linkType: 'Environment',
                    },
                },
                publishedVersion: 1,
                publishedAt: '2023-06-26T14:12:43.400Z',
                firstPublishedAt: '2023-06-26T14:12:43.400Z',
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
                publishedBy: {
                    sys: {
                        type: 'Link',
                        linkType: 'User',
                        id: '7fkm1bGT9u8nLkbD7Uuqsr',
                    },
                },
                automationTags: [],
                contentType: {
                    sys: {
                        type: 'Link',
                        linkType: 'ContentType',
                        id: 'appliedMigrations',
                    },
                },
            },
            fields: {
                timestamp: {
                    'en-US': '20230609122547608',
                },
                name: {
                    'en-US': 'new-migration',
                },
                batch: {
                    'en-US': 2,
                },
            },
        },
        {
            metadata: {
                tags: [],
            },
            sys: {
                space: {
                    sys: {
                        type: 'Link',
                        linkType: 'Space',
                        id: 'TEST_SPACE_ID',
                    },
                },
                id: '5UALu1mPBVs3arGpz6BQOS',
                type: 'Entry',
                createdAt: '2023-06-26T13:47:13.646Z',
                updatedAt: '2023-06-26T13:47:13.646Z',
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
                automationTags: [],
                contentType: {
                    sys: {
                        type: 'Link',
                        linkType: 'ContentType',
                        id: 'appliedMigrations',
                    },
                },
            },
            fields: {
                timestamp: {
                    'en-US': '20230602075003097 (1)',
                },
                name: {
                    'en-US': 'inititial-migration',
                },
                batch: {
                    'en-US': 1,
                },
            },
        },
        {
            metadata: {
                tags: [],
            },
            sys: {
                space: {
                    sys: {
                        type: 'Link',
                        linkType: 'Space',
                        id: 'TEST_SPACE_ID',
                    },
                },
                id: '6iq3xP0EsGS9NzJoWvyblp',
                type: 'Entry',
                createdAt: '2023-06-26T13:47:12.064Z',
                updatedAt: '2023-06-26T13:47:12.064Z',
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
                automationTags: [],
                contentType: {
                    sys: {
                        type: 'Link',
                        linkType: 'ContentType',
                        id: 'appliedMigrations',
                    },
                },
            },
            fields: {
                timestamp: {
                    'en-US': '20230602075003097 (1)',
                },
                name: {
                    'en-US': 'inititial-migration',
                },
                batch: {
                    'en-US': 1,
                },
            },
        },
    ],
}
