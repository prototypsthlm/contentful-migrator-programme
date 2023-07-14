const {rest} = require("msw");
const {baseURL} = require("../../baseContentfulHandler");

const timestampPattern = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/
module.exports.applyOneMigrationHandler = [
    //todo: diff check response type, might differ between subsequent requests
    //todo: also handle response with query params: entries?content_type=appliedMigrations&limit=1000
    rest.get(`${baseURL}/environments/master/content_types/appliedMigrations`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "sys": {
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "TEST_SPACE_ID"
                        }
                    },
                    "id": "appliedMigrations",
                    "type": "ContentType",
                    "createdAt": "2023-06-02T08:50:44.787Z",
                    "updatedAt": "2023-06-05T14:20:22.754Z",
                    "environment": {
                        "sys": {
                            "id": "master",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    "publishedVersion": 3,
                    "publishedAt": "2023-06-05T14:20:22.754Z",
                    "firstPublishedAt": "2023-06-02T08:50:45.349Z",
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "publishedCounter": 2,
                    "version": 4,
                    "publishedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    }
                },
                "displayField": "timestamp",
                "name": "Applied migrations",
                "description": "",
                "fields": [
                    {
                        "id": "timestamp",
                        "name": "Timestamp",
                        "type": "Symbol",
                        "localized": false,
                        "required": true,
                        "validations": [],
                        "disabled": false,
                        "omitted": false
                    },
                    {
                        "id": "name",
                        "name": "Name",
                        "type": "Symbol",
                        "localized": false,
                        "required": true,
                        "validations": [],
                        "disabled": false,
                        "omitted": false
                    },
                    {
                        "id": "batch",
                        "name": "Batch number",
                        "type": "Integer",
                        "localized": false,
                        "required": true,
                        "validations": [],
                        "disabled": false,
                        "omitted": false
                    }
                ]
            }),
        )
    }),
    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "sys": {
                    "type": "Array"
                },
                "total": 2,
                "skip": 0,
                "limit": 1000,
                "items": [
                    {
                        "metadata": {
                            "tags": []
                        },
                        "sys": {
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "id": "5UALu1mPBVs3arGpz6BQOS",
                            "type": "Entry",
                            "createdAt": "2023-06-26T13:47:13.646Z",
                            "updatedAt": "2023-06-26T13:47:13.646Z",
                            "environment": {
                                "sys": {
                                    "id": "master",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "publishedCounter": 0,
                            "version": 1,
                            "automationTags": [],
                            "contentType": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "ContentType",
                                    "id": "appliedMigrations"
                                }
                            }
                        },
                        "fields": {
                            "timestamp": {
                                "en-US": "20230602075003097 (1)"
                            },
                            "name": {
                                "en-US": "inititial-migration"
                            },
                            "batch": {
                                "en-US": 1
                            }
                        }
                    },
                    {
                        "metadata": {
                            "tags": []
                        },
                        "sys": {
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "id": "6iq3xP0EsGS9NzJoWvyblp",
                            "type": "Entry",
                            "createdAt": "2023-06-26T13:47:12.064Z",
                            "updatedAt": "2023-06-26T13:47:12.064Z",
                            "environment": {
                                "sys": {
                                    "id": "master",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "publishedCounter": 0,
                            "version": 1,
                            "automationTags": [],
                            "contentType": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "ContentType",
                                    "id": "appliedMigrations"
                                }
                            }
                        },
                        "fields": {
                            "timestamp": {
                                "en-US": "20230602075003097 (1)"
                            },
                            "name": {
                                "en-US": "inititial-migration"
                            },
                            "batch": {
                                "en-US": 1
                            }
                        }
                    }
                ]
            }),
        )
    }),
    rest.get(`${baseURL}/environments`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "total": 3,
                "limit": 25,
                "skip": 0,
                "sys": {
                    "type": "Array"
                },
                "items": [
                    {
                        "name": "test",
                        "sys": {
                            "type": "Environment",
                            "id": "test",
                            "version": 3,
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "status": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Status",
                                    "id": "ready"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "createdAt": "2023-06-08T12:21:36Z",
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedAt": "2023-06-08T12:21:36Z",
                            "aliases": []
                        }
                    },
                    {
                        "name": "2023-06-28-11-33-42",
                        "sys": {
                            "type": "Environment",
                            "id": "2023-06-28-11-33-42",
                            "version": 3,
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "status": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Status",
                                    "id": "ready"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "createdAt": "2023-06-28T11:33:43Z",
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedAt": "2023-06-28T11:33:43Z",
                            "aliases": [
                                {
                                    "sys": {
                                        "type": "Link",
                                        "linkType": "EnvironmentAlias",
                                        "id": "master"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "name": "2023-06-28-11-33-42",
                        "sys": {
                            "type": "Environment",
                            "id": "master",
                            "aliasedEnvironment": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Environment",
                                    "id": "2023-06-28-11-33-42"
                                }
                            },
                            "version": 3,
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "status": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Status",
                                    "id": "ready"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "createdAt": "2023-06-28T11:33:43Z",
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedAt": "2023-06-28T11:33:43Z"
                        }
                    }
                ]
            }),
        )
    }),

    //wildcard to handle dynamic timestamp from contentful
    rest.put(`${baseURL}/environments/*`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                "name": "2023-06-28-11-35-08",
                "sys": {
                    "type": "Environment",
                    "id": "2023-06-28-11-35-08",
                    "version": 1,
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "TEST_SPACE_ID"
                        }
                    },
                    "status": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Status",
                            "id": "queued"
                        }
                    },
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "createdAt": "2023-06-28T11:35:09Z",
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedAt": "2023-06-28T11:35:09Z",
                    "aliases": []
                }
            }),
        )
    }),

    rest.get(`${baseURL}/api_keys`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "total": 1,
                "limit": 25,
                "skip": 0,
                "sys": {
                    "type": "Array"
                },
                "items": [
                    {
                        "name": "Example space token 1",
                        "description": "This token is used by an example app. It is coupled with the content previews.",
                        "accessToken": "c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045",
                        "policies": [
                            {
                                "effect": "allow",
                                "actions": "all"
                            }
                        ],
                        "sys": {
                            "type": "ApiKey",
                            "id": "1Yrt2lSOGbwEjPWJVg6yJA",
                            "version": 79,
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "createdAt": "2018-09-17T08:26:09Z",
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedAt": "2023-06-28T11:33:43Z"
                        },
                        "environments": [
                            {
                                "sys": {
                                    "id": "master",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-02-08-50-46",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-11-14-05",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-11-18-44",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-11-19-09",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-11-19-33",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-08-11",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-09-36",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-13-09",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-21-53",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-25-50",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-29-49",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-30-33",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-30-50",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-35-27",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-12-58-23",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-10-01",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-10-44",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-12-01",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-12-19",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-12-46",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-13-12",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-14-12",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-18-45",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-33-50",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-35-12",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-35-50",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-36-46",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-38-59",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-40-09",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-40-30",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-52-54",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-14-53-49",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-03-45",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-04-30",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-14-56",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-15-34",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-24-35",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-25-05",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-25-47",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-38-32",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-51-32",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-56-58",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-57-36",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-15-59-18",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-16-02-06",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-16-02-58",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-16-05-53",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-05-16-07-40",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-07-07-23-21",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-07-07-23-46",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-07-08-05-31",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-07-08-38-35",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-08-08-08-37",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-08-08-08-56",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-15-50",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-16-29",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-17-53",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-18-54",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-19-15",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-22-38",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-26-32",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-12-56-57",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-13-49-12",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-13-52-52",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-09-13-53-47",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-14-08-27-25",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-13-46-48",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-14-05-43",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-14-07-29",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-14-11-02",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-14-12-01",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-26-14-12-36",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-27-08-53-00",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-28-07-02-37",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-28-11-32-12",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-28-11-32-44",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            },
                            {
                                "sys": {
                                    "id": "2023-06-28-11-33-42",
                                    "type": "Link",
                                    "linkType": "Environment"
                                }
                            }
                        ],
                        "preview_api_key": {
                            "sys": {
                                "type": "Link",
                                "linkType": "PreviewApiKey",
                                "id": "1YsyWIrKbsWrbImKsd9Bqq"
                            }
                        }
                    }
                ]
            }),
        )
    }),

    //wildcard to handle api_key PUT request with dynamic timestamp
    rest.put(`${baseURL}/api_keys/*`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                "name": "Example space token 1",
                "description": "This token is used by an example app. It is coupled with the content previews.",
                "accessToken": "c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045",
                "policies": [
                    {
                        "effect": "allow",
                        "actions": "all"
                    }
                ],
                "sys": {
                    "type": "ApiKey",
                    "id": "1Yrt2lSOGbwEjPWJVg6yJA",
                    "version": 80,
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "TEST_SPACE_ID"
                        }
                    },
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "createdAt": "2018-09-17T08:26:09Z",
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedAt": "2023-06-28T11:35:10Z"
                },
                "environments": [
                    {
                        "sys": {
                            "id": "master",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-02-08-50-46",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-11-14-05",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-11-18-44",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-11-19-09",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-11-19-33",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-08-11",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-09-36",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-13-09",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-21-53",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-25-50",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-29-49",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-30-33",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-30-50",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-35-27",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-12-58-23",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-10-01",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-10-44",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-12-01",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-12-19",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-12-46",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-13-12",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-14-12",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-18-45",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-33-50",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-35-12",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-35-50",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-36-46",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-38-59",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-40-09",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-40-30",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-52-54",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-14-53-49",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-03-45",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-04-30",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-14-56",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-15-34",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-24-35",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-25-05",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-25-47",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-38-32",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-51-32",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-56-58",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-57-36",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-15-59-18",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-16-02-06",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-16-02-58",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-16-05-53",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-05-16-07-40",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-07-07-23-21",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-07-07-23-46",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-07-08-05-31",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-07-08-38-35",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-08-08-08-37",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-08-08-08-56",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-15-50",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-16-29",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-17-53",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-18-54",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-19-15",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-22-38",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-26-32",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-12-56-57",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-13-49-12",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-13-52-52",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-09-13-53-47",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-14-08-27-25",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-13-46-48",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-14-05-43",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-14-07-29",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-14-11-02",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-14-12-01",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-26-14-12-36",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-27-08-53-00",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-28-07-02-37",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-28-11-32-12",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-28-11-32-44",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-28-11-33-42",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    {
                        "sys": {
                            "id": "2023-06-28-11-35-08",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    }
                ],
                "preview_api_key": {
                    "sys": {
                        "type": "Link",
                        "linkType": "PreviewApiKey",
                        "id": "1YsyWIrKbsWrbImKsd9Bqq"
                    }
                }
            }),
        )
    }),

    rest.get(`${baseURL}/environments/*/locales`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "sys": {
                    "type": "Array"
                },
                "total": 1,
                "skip": 0,
                "limit": 100,
                "items": [
                    {
                        "name": "English (United States)",
                        "internal_code": "en-US",
                        "code": "en-US",
                        "fallbackCode": null,
                        "default": true,
                        "contentManagementApi": true,
                        "contentDeliveryApi": true,
                        "optional": false,
                        "sys": {
                            "type": "Locale",
                            "id": "1VDLlb9oKX4EE2oI6p9kMa",
                            "version": 1,
                            "space": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Space",
                                    "id": "TEST_SPACE_ID"
                                }
                            },
                            "environment": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "Environment",
                                    "id": "2023-06-28-11-35-08",
                                    "uuid": "ddefb40d-4099-450d-8d99-49c07db971ab"
                                }
                            },
                            "createdBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "createdAt": "2023-06-28T11:35:09Z",
                            "updatedBy": {
                                "sys": {
                                    "type": "Link",
                                    "linkType": "User",
                                    "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                                }
                            },
                            "updatedAt": "2023-06-28T11:35:09Z"
                        }
                    }
                ]
            }),
        )
    }),

    //todo: GET /locales?limit=100&order=sys.createdAt&skip=0

    //todo: POST /entries
    rest.post(`${baseURL}/environments/*/entries`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "metadata": {
                    "tags": []
                },
                "sys": {
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "bo6ijs14u5ox"
                        }
                    },
                    "id": "P9aHLvrSfpLvqzb7o280G",
                    "type": "Entry",
                    "createdAt": "2023-06-28T11:35:14.661Z",
                    "updatedAt": "2023-06-28T11:35:14.661Z",
                    "environment": {
                        "sys": {
                            "id": "2023-06-28-11-35-08",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "publishedCounter": 0,
                    "version": 1,
                    "automationTags": [],
                    "contentType": {
                        "sys": {
                            "type": "Link",
                            "linkType": "ContentType",
                            "id": "appliedMigrations"
                        }
                    }
                },
                "fields": {
                    "timestamp": {
                        "en-US": "20230609122547608"
                    },
                    "name": {
                        "en-US": "new-migration"
                    },
                    "batch": {
                        "en-US": 2
                    }
                }
            }),
        )
    }),

    //todo: PUT https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-29-08-45-20/entries/2WP3BQMevIXiCXPA6GCIPH/published
    rest.put(`${baseURL}/environments/*/entries/*/published`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                "metadata": {
                    "tags": []
                },
                "sys": {
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "bo6ijs14u5ox"
                        }
                    },
                    "id": "P9aHLvrSfpLvqzb7o280G",
                    "type": "Entry",
                    "createdAt": "2023-06-28T11:35:14.661Z",
                    "updatedAt": "2023-06-28T11:35:15.127Z",
                    "environment": {
                        "sys": {
                            "id": "2023-06-28-11-35-08",
                            "type": "Link",
                            "linkType": "Environment"
                        }
                    },
                    "publishedVersion": 1,
                    "publishedAt": "2023-06-28T11:35:15.127Z",
                    "firstPublishedAt": "2023-06-28T11:35:15.127Z",
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "publishedCounter": 1,
                    "version": 2,
                    "publishedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "automationTags": [],
                    "contentType": {
                        "sys": {
                            "type": "Link",
                            "linkType": "ContentType",
                            "id": "appliedMigrations"
                        }
                    }
                },
                "fields": {
                    "timestamp": {
                        "en-US": "20230609122547608"
                    },
                    "name": {
                        "en-US": "new-migration"
                    },
                    "batch": {
                        "en-US": 2
                    }
                }
            }),
        )
    }),

    //wildcard to handle environments GET request with dynamic timestamp
    //https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08
    rest.get(`${baseURL}/environments/*`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "name": "2023-06-28-11-35-08",
                "sys": {
                    "type": "Environment",
                    "id": "2023-06-28-11-35-08",
                    "version": 3,
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "TEST_SPACE_ID"
                        }
                    },
                    "status": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Status",
                            "id": "ready"
                        }
                    },
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "createdAt": "2023-06-28T11:35:09Z",
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedAt": "2023-06-28T11:35:09Z",
                    "aliases": []
                }
            }),
        )
    }),

    //Found an unhandled DELETE request to https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08
    //wildcard to handle environments DELETE request with dynamic timestamp
    rest.delete(`${baseURL}/environments/*`, (req, res, ctx) => {

       console.log("HITTING DELETE")
        return res(
            ctx.status(204),
            ctx.json({
                "name": "2023-06-28-11-35-08",
                "sys": {
                    "type": "Environment",
                    "id": "2023-06-28-11-35-08",
                    "version": 3,
                    "space": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Space",
                            "id": "TEST_SPACE_ID"
                        }
                    },
                    "status": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Status",
                            "id": "ready"
                        }
                    },
                    "createdBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "createdAt": "2023-06-28T11:35:09Z",
                    "updatedBy": {
                        "sys": {
                            "type": "Link",
                            "linkType": "User",
                            "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                        }
                    },
                    "updatedAt": "2023-06-28T11:35:09Z",
                    "aliases": []
                }
            }),
        )
    }),
]



let responses = [
/*    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/master/content_types/appliedMigrations",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"appliedMigrations\",\"type\":\"ContentType\",\"createdAt\":\"2023-06-02T08:50:44.787Z\",\"updatedAt\":\"2023-06-05T14:20:22.754Z\",\"environment\":{\"sys\":{\"id\":\"master\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"publishedVersion\":3,\"publishedAt\":\"2023-06-05T14:20:22.754Z\",\"firstPublishedAt\":\"2023-06-02T08:50:45.349Z\",\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":2,\"version\":4,\"publishedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}}},\"displayField\":\"timestamp\",\"name\":\"Applied migrations\",\"description\":\"\",\"fields\":[{\"id\":\"timestamp\",\"name\":\"Timestamp\",\"type\":\"Symbol\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false},{\"id\":\"name\",\"name\":\"Name\",\"type\":\"Symbol\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false},{\"id\":\"batch\",\"name\":\"Batch number\",\"type\":\"Integer\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false}]}\n"
    },*/
/*    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/master/entries?content_type=appliedMigrations&limit=1000",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":2,\"skip\":0,\"limit\":1000,\"items\":[{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"5UALu1mPBVs3arGpz6BQOS\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:13.646Z\",\"updatedAt\":\"2023-06-26T13:47:13.646Z\",\"environment\":{\"sys\":{\"id\":\"master\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}},{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"6iq3xP0EsGS9NzJoWvyblp\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:12.064Z\",\"updatedAt\":\"2023-06-26T13:47:12.064Z\",\"environment\":{\"sys\":{\"id\":\"master\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}}]}\n"
    },*/
    /*{
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"total\":3,\n  \"limit\":25,\n  \"skip\":0,\n  \"sys\":{\n    \"type\":\"Array\"\n  },\n  \"items\":[\n    {\n      \"name\":\"test\",\n      \"sys\":{\n        \"type\":\"Environment\",\n        \"id\":\"test\",\n        \"version\":3,\n        \"space\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Space\",\n            \"id\":\"TEST_SPACE_ID\"\n          }\n        },\n        \"status\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Status\",\n            \"id\":\"ready\"\n          }\n        },\n        \"createdBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"createdAt\":\"2023-06-08T12:21:36Z\",\n        \"updatedBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"updatedAt\":\"2023-06-08T12:21:36Z\",\n        \"aliases\":[]\n      }\n    },\n    {\n      \"name\":\"2023-06-28-11-33-42\",\n      \"sys\":{\n        \"type\":\"Environment\",\n        \"id\":\"2023-06-28-11-33-42\",\n        \"version\":3,\n        \"space\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Space\",\n            \"id\":\"TEST_SPACE_ID\"\n          }\n        },\n        \"status\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Status\",\n            \"id\":\"ready\"\n          }\n        },\n        \"createdBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"createdAt\":\"2023-06-28T11:33:43Z\",\n        \"updatedBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"updatedAt\":\"2023-06-28T11:33:43Z\",\n        \"aliases\":[\n          {\n            \"sys\":{\n              \"type\":\"Link\",\n              \"linkType\":\"EnvironmentAlias\",\n              \"id\":\"master\"\n            }\n          }\n        ]\n      }\n    },\n    {\n      \"name\":\"2023-06-28-11-33-42\",\n      \"sys\":{\n        \"type\":\"Environment\",\n        \"id\":\"master\",\n        \"aliasedEnvironment\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\",\n            \"id\":\"2023-06-28-11-33-42\"\n          }\n        },\n        \"version\":3,\n        \"space\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Space\",\n            \"id\":\"TEST_SPACE_ID\"\n          }\n        },\n        \"status\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Status\",\n            \"id\":\"ready\"\n          }\n        },\n        \"createdBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"createdAt\":\"2023-06-28T11:33:43Z\",\n        \"updatedBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"updatedAt\":\"2023-06-28T11:33:43Z\"\n      }\n    }\n  ]\n}\n\n"
    },*/
    /*{
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08",
        "method": "PUT",
        "status": 201,
        "statusText": "Created",
        "headers": {},
        "body": "{\n  \"name\":\"2023-06-28-11-35-08\",\n  \"sys\":{\n    \"type\":\"Environment\",\n    \"id\":\"2023-06-28-11-35-08\",\n    \"version\":1,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"status\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Status\",\n        \"id\":\"queued\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-28T11:35:09Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:35:09Z\",\n    \"aliases\":[]\n  }\n}\n\n"
    },*/
/*    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/api_keys",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"total\":1,\n  \"limit\":25,\n  \"skip\":0,\n  \"sys\":{\n    \"type\":\"Array\"\n  },\n  \"items\":[\n    {\n      \"name\":\"Example space token 1\",\n      \"description\":\"This token is used by an example app. It is coupled with the content previews.\",\n      \"accessToken\":\"c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045\",\n      \"policies\":[\n        {\n          \"effect\":\"allow\",\n          \"actions\":\"all\"\n        }\n      ],\n      \"sys\":{\n        \"type\":\"ApiKey\",\n        \"id\":\"1Yrt2lSOGbwEjPWJVg6yJA\",\n        \"version\":79,\n        \"space\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"Space\",\n            \"id\":\"TEST_SPACE_ID\"\n          }\n        },\n        \"createdBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"createdAt\":\"2018-09-17T08:26:09Z\",\n        \"updatedBy\":{\n          \"sys\":{\n            \"type\":\"Link\",\n            \"linkType\":\"User\",\n            \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n          }\n        },\n        \"updatedAt\":\"2023-06-28T11:33:43Z\"\n      },\n      \"environments\":[\n        {\n          \"sys\":{\n            \"id\":\"master\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-02-08-50-46\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-11-14-05\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-11-18-44\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-11-19-09\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-11-19-33\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-08-11\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-09-36\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-13-09\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-21-53\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-25-50\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-29-49\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-30-33\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-30-50\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-35-27\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-12-58-23\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-10-01\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-10-44\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-12-01\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-12-19\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-12-46\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-13-12\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-14-12\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-18-45\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-33-50\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-35-12\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-35-50\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-36-46\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-38-59\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-40-09\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-40-30\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-52-54\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-14-53-49\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-03-45\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-04-30\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-14-56\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-15-34\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-24-35\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-25-05\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-25-47\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-38-32\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-51-32\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-56-58\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-57-36\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-15-59-18\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-16-02-06\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-16-02-58\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-16-05-53\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-05-16-07-40\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-07-07-23-21\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-07-07-23-46\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-07-08-05-31\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-07-08-38-35\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-08-08-08-37\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-08-08-08-56\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-15-50\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-16-29\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-17-53\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-18-54\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-19-15\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-22-38\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-26-32\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-12-56-57\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-13-49-12\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-13-52-52\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-09-13-53-47\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-14-08-27-25\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-13-46-48\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-14-05-43\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-14-07-29\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-14-11-02\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-14-12-01\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-26-14-12-36\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-27-08-53-00\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-28-07-02-37\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-28-11-32-12\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-28-11-32-44\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        },\n        {\n          \"sys\":{\n            \"id\":\"2023-06-28-11-33-42\",\n            \"type\":\"Link\",\n            \"linkType\":\"Environment\"\n          }\n        }\n      ],\n      \"preview_api_key\":{\n        \"sys\":{\n          \"type\":\"Link\",\n          \"linkType\":\"PreviewApiKey\",\n          \"id\":\"1YsyWIrKbsWrbImKsd9Bqq\"\n        }\n      }\n    }\n  ]\n}\n\n"
    },*/
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/api_keys/1Yrt2lSOGbwEjPWJVg6yJA",
        "method": "PUT",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"name\":\"Example space token 1\",\n  \"description\":\"This token is used by an example app. It is coupled with the content previews.\",\n  \"accessToken\":\"c11ea00b60091e878e7966c52e1138ad3adf5ff00a99c5dde77cb05a83743045\",\n  \"policies\":[\n    {\n      \"effect\":\"allow\",\n      \"actions\":\"all\"\n    }\n  ],\n  \"sys\":{\n    \"type\":\"ApiKey\",\n    \"id\":\"1Yrt2lSOGbwEjPWJVg6yJA\",\n    \"version\":80,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2018-09-17T08:26:09Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:35:10Z\"\n  },\n  \"environments\":[\n    {\n      \"sys\":{\n        \"id\":\"master\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-02-08-50-46\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-11-14-05\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-11-18-44\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-11-19-09\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-11-19-33\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-08-11\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-09-36\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-13-09\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-21-53\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-25-50\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-29-49\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-30-33\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-30-50\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-35-27\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-12-58-23\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-10-01\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-10-44\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-12-01\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-12-19\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-12-46\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-13-12\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-14-12\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-18-45\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-33-50\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-35-12\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-35-50\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-36-46\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-38-59\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-40-09\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-40-30\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-52-54\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-14-53-49\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-03-45\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-04-30\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-14-56\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-15-34\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-24-35\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-25-05\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-25-47\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-38-32\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-51-32\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-56-58\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-57-36\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-15-59-18\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-16-02-06\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-16-02-58\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-16-05-53\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-05-16-07-40\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-07-07-23-21\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-07-07-23-46\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-07-08-05-31\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-07-08-38-35\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-08-08-08-37\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-08-08-08-56\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-15-50\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-16-29\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-17-53\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-18-54\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-19-15\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-22-38\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-26-32\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-12-56-57\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-13-49-12\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-13-52-52\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-09-13-53-47\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-14-08-27-25\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-13-46-48\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-14-05-43\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-14-07-29\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-14-11-02\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-14-12-01\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-26-14-12-36\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-27-08-53-00\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-28-07-02-37\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-28-11-32-12\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-28-11-32-44\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-28-11-33-42\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    },\n    {\n      \"sys\":{\n        \"id\":\"2023-06-28-11-35-08\",\n        \"type\":\"Link\",\n        \"linkType\":\"Environment\"\n      }\n    }\n  ],\n  \"preview_api_key\":{\n    \"sys\":{\n      \"type\":\"Link\",\n      \"linkType\":\"PreviewApiKey\",\n      \"id\":\"1YsyWIrKbsWrbImKsd9Bqq\"\n    }\n  }\n}\n\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"name\":\"TypeOne\",\n  \"sys\":{\n    \"type\":\"Space\",\n    \"id\":\"TEST_SPACE_ID\",\n    \"version\":7,\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2018-09-17T08:26:06Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2022-12-15T09:11:48Z\",\n    \"organization\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Organization\",\n        \"id\":\"1kUUWhojvGtUmRyhXfqSwK\"\n      }\n    }\n  }\n}\n\n"
    },
/*    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"name\":\"2023-06-28-11-35-08\",\n  \"sys\":{\n    \"type\":\"Environment\",\n    \"id\":\"2023-06-28-11-35-08\",\n    \"version\":3,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"status\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Status\",\n        \"id\":\"ready\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-28T11:35:09Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:35:09Z\",\n    \"aliases\":[]\n  }\n}\n\n"
    },*/
/*    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/locales",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":1,\"skip\":0,\"limit\":100,\"items\":[{\"name\":\"English (United States)\",\"internal_code\":\"en-US\",\"code\":\"en-US\",\"fallbackCode\":null,\"default\":true,\"contentManagementApi\":true,\"contentDeliveryApi\":true,\"optional\":false,\"sys\":{\"type\":\"Locale\",\"id\":\"1VDLlb9oKX4EE2oI6p9kMa\",\"version\":1,\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"environment\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Environment\",\"id\":\"2023-06-28-11-35-08\",\"uuid\":\"ddefb40d-4099-450d-8d99-49c07db971ab\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"createdAt\":\"2023-06-28T11:35:09Z\",\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedAt\":\"2023-06-28T11:35:09Z\"}}]}\n"
    },*/
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/content_types/appliedMigrations",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"appliedMigrations\",\"type\":\"ContentType\",\"createdAt\":\"2023-06-02T08:50:44.787Z\",\"updatedAt\":\"2023-06-05T14:20:22.754Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"publishedVersion\":3,\"publishedAt\":\"2023-06-05T14:20:22.754Z\",\"firstPublishedAt\":\"2023-06-02T08:50:45.349Z\",\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":2,\"version\":4,\"publishedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}}},\"displayField\":\"timestamp\",\"name\":\"Applied migrations\",\"description\":\"\",\"fields\":[{\"id\":\"timestamp\",\"name\":\"Timestamp\",\"type\":\"Symbol\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false},{\"id\":\"name\",\"name\":\"Name\",\"type\":\"Symbol\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false},{\"id\":\"batch\",\"name\":\"Batch number\",\"type\":\"Integer\",\"localized\":false,\"required\":true,\"validations\":[],\"disabled\":false,\"omitted\":false}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/entries?content_type=appliedMigrations&limit=1000",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":2,\"skip\":0,\"limit\":1000,\"items\":[{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"5UALu1mPBVs3arGpz6BQOS\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:13.646Z\",\"updatedAt\":\"2023-06-26T13:47:13.646Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}},{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"6iq3xP0EsGS9NzJoWvyblp\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:12.064Z\",\"updatedAt\":\"2023-06-26T13:47:12.064Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/content_types?limit=100&order=sys.createdAt&sys.id[in]=testContentType&skip=0",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":0,\"skip\":0,\"limit\":100,\"items\":[]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/locales?limit=100&order=sys.createdAt&skip=0",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":1,\"skip\":0,\"limit\":100,\"items\":[{\"name\":\"English (United States)\",\"internal_code\":\"en-US\",\"code\":\"en-US\",\"fallbackCode\":null,\"default\":true,\"contentManagementApi\":true,\"contentDeliveryApi\":true,\"optional\":false,\"sys\":{\"type\":\"Locale\",\"id\":\"1VDLlb9oKX4EE2oI6p9kMa\",\"version\":1,\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"environment\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Environment\",\"id\":\"2023-06-28-11-35-08\",\"uuid\":\"ddefb40d-4099-450d-8d99-49c07db971ab\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"createdAt\":\"2023-06-28T11:35:09Z\",\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedAt\":\"2023-06-28T11:35:09Z\"}}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/content_types/testContentType",
        "method": "PUT",
        "status": 201,
        "statusText": "Created",
        "headers": {},
        "body": "{\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"testContentType\",\"type\":\"ContentType\",\"createdAt\":\"2023-06-28T11:35:12.987Z\",\"updatedAt\":\"2023-06-28T11:35:12.987Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1},\"displayField\":\"testContentId\",\"name\":\"Test content type\",\"description\":\"\",\"fields\":[{\"id\":\"testContentId\",\"name\":\"test content id\",\"type\":\"Symbol\",\"localized\":false,\"required\":false,\"validations\":[],\"disabled\":false,\"omitted\":false}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/content_types/testContentType/published",
        "method": "PUT",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"testContentType\",\"type\":\"ContentType\",\"createdAt\":\"2023-06-28T11:35:12.987Z\",\"updatedAt\":\"2023-06-28T11:35:13.333Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":1,\"version\":2,\"firstPublishedAt\":\"2023-06-28T11:35:13.333Z\",\"publishedAt\":\"2023-06-28T11:35:13.333Z\",\"publishedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedVersion\":1},\"displayField\":\"testContentId\",\"name\":\"Test content type\",\"description\":\"\",\"fields\":[{\"id\":\"testContentId\",\"name\":\"test content id\",\"type\":\"Symbol\",\"localized\":false,\"required\":false,\"validations\":[],\"disabled\":false,\"omitted\":false}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/entries?content_type=appliedMigrations&limit=1000",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"sys\":{\"type\":\"Array\"},\"total\":2,\"skip\":0,\"limit\":1000,\"items\":[{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"5UALu1mPBVs3arGpz6BQOS\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:13.646Z\",\"updatedAt\":\"2023-06-26T13:47:13.646Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}},{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"6iq3xP0EsGS9NzJoWvyblp\",\"type\":\"Entry\",\"createdAt\":\"2023-06-26T13:47:12.064Z\",\"updatedAt\":\"2023-06-26T13:47:12.064Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230602075003097 (1)\"},\"name\":{\"en-US\":\"inititial-migration\"},\"batch\":{\"en-US\":1}}}]}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/entries",
        "method": "POST",
        "status": 201,
        "statusText": "Created",
        "headers": {},
        "body": "{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"P9aHLvrSfpLvqzb7o280G\",\"type\":\"Entry\",\"createdAt\":\"2023-06-28T11:35:14.661Z\",\"updatedAt\":\"2023-06-28T11:35:14.661Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":0,\"version\":1,\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230609122547608\"},\"name\":{\"en-US\":\"new-migration\"},\"batch\":{\"en-US\":2}}}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-35-08/entries/P9aHLvrSfpLvqzb7o280G/published",
        "method": "PUT",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\"metadata\":{\"tags\":[]},\"sys\":{\"space\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"Space\",\"id\":\"TEST_SPACE_ID\"}},\"id\":\"P9aHLvrSfpLvqzb7o280G\",\"type\":\"Entry\",\"createdAt\":\"2023-06-28T11:35:14.661Z\",\"updatedAt\":\"2023-06-28T11:35:15.127Z\",\"environment\":{\"sys\":{\"id\":\"2023-06-28-11-35-08\",\"type\":\"Link\",\"linkType\":\"Environment\"}},\"publishedVersion\":1,\"publishedAt\":\"2023-06-28T11:35:15.127Z\",\"firstPublishedAt\":\"2023-06-28T11:35:15.127Z\",\"createdBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"updatedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"publishedCounter\":1,\"version\":2,\"publishedBy\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"User\",\"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"}},\"automationTags\":[],\"contentType\":{\"sys\":{\"type\":\"Link\",\"linkType\":\"ContentType\",\"id\":\"appliedMigrations\"}}},\"fields\":{\"timestamp\":{\"en-US\":\"20230609122547608\"},\"name\":{\"en-US\":\"new-migration\"},\"batch\":{\"en-US\":2}}}\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environment_aliases/master",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"sys\":{\n    \"type\":\"EnvironmentAlias\",\n    \"id\":\"master\",\n    \"version\":16,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-05T12:35:02Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:33:50Z\"\n  },\n  \"environment\":{\n    \"sys\":{\n      \"type\":\"Link\",\n      \"linkType\":\"Environment\",\n      \"id\":\"2023-06-28-11-33-42\"\n    }\n  }\n}\n\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environment_aliases/master",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"sys\":{\n    \"type\":\"EnvironmentAlias\",\n    \"id\":\"master\",\n    \"version\":16,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-05T12:35:02Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:33:50Z\"\n  },\n  \"environment\":{\n    \"sys\":{\n      \"type\":\"Link\",\n      \"linkType\":\"Environment\",\n      \"id\":\"2023-06-28-11-33-42\"\n    }\n  }\n}\n\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environment_aliases/master",
        "method": "PUT",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"sys\":{\n    \"type\":\"EnvironmentAlias\",\n    \"id\":\"master\",\n    \"version\":17,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-05T12:35:02Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:35:16Z\"\n  },\n  \"environment\":{\n    \"sys\":{\n      \"type\":\"Link\",\n      \"linkType\":\"Environment\",\n      \"id\":\"2023-06-28-11-35-08\"\n    }\n  }\n}\n\n"
    },
    {
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-33-42",
        "method": "GET",
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "body": "{\n  \"name\":\"2023-06-28-11-33-42\",\n  \"sys\":{\n    \"type\":\"Environment\",\n    \"id\":\"2023-06-28-11-33-42\",\n    \"version\":3,\n    \"space\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Space\",\n        \"id\":\"TEST_SPACE_ID\"\n      }\n    },\n    \"status\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"Status\",\n        \"id\":\"ready\"\n      }\n    },\n    \"createdBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"createdAt\":\"2023-06-28T11:33:43Z\",\n    \"updatedBy\":{\n      \"sys\":{\n        \"type\":\"Link\",\n        \"linkType\":\"User\",\n        \"id\":\"7fkm1bGT9u8nLkbD7Uuqsr\"\n      }\n    },\n    \"updatedAt\":\"2023-06-28T11:33:43Z\",\n    \"aliases\":[]\n  }\n}\n\n"
    },
    {
        "id": "0115a323-ff93-4404-9a0a-8ab0801abf87",
        "url": "https://api.contentful.com/spaces/TEST_SPACE_ID/environments/2023-06-28-11-33-42",
        "status": 204,
        "statusText": "No Content",
        "headers": {},
        "body": ""
    }
]
