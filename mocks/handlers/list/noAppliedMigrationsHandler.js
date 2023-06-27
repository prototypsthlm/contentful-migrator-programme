const {rest} = require("msw");
const {baseURL} = require("../../baseContentfulHandler");
module.exports.listNoAppliedMigrationHandler = [
    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(body),
        )
    }),
]

const body = {
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
                        "id": "bo6ijs14u5ox"
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
                        "id": "bo6ijs14u5ox"
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
}