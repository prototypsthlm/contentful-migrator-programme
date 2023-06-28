const {setupServer} = require('msw/node')
const log = require("../../lib/log")
const {rest} = require("msw")

let mockedContentfulServer = null

module.exports.baseURL = 'https://api.contentful.com/spaces/TEST_SPACE_ID'

module.exports.setupMockedContentfulApi = (handlers) => {
    if (handlers == null) {
        handlers = []
    }
    log.info("setting up mocked contentful rest server")
    const server = setupServer(...spacesHandler, ...localeHandler, ...masterEnvironmentHandler, ...handlers)

    //log unhandled requests
    server.listen({
        onUnhandledRequest(req) {
            log.warn(
                `* Found an unhandled ${req.method} request to ${req.url.href}`,
            )
        },
    })

    process.on('exit', () => {
        log.info("handling exit...")
    })

    server.events.on('request:start', (request, response) => {
        // Record every dispatched request.
        log.info(
            `* intercepting ${request.method} request to ${request.url}`,
        )
    })

    mockedContentfulServer = server
}

module.exports.closeMockedContentfulApi = () => {
    console.log("CLOSING MOCKED CONTENTFUL SERVER")
    if(mockedContentfulServer != null ){
        mockedContentfulServer.close()
    }
}

const spacesHandler = [
    rest.get(`${this.baseURL}`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(spacesResponseBody),
        )
    }),
]

const localeHandler = [
    rest.get(`${this.baseURL}/environments/master/locales`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(localeResponseBody),
        )
    }),
]

const masterEnvironmentHandler = [
    rest.get(`${this.baseURL}/environments/master`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(masterEnvironmentResponseBody),
        )
    }),
]

//Region: response bodies

//https://api.contentful.com/spaces/TEST_SPACE_ID
const spacesResponseBody = {
    "name": "spaceName",
    "sys": {
        "type": "Space",
        "id": "TEST_SPACE_ID",
        "version": 7,
        "createdBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "7fkm1bGT9u8nLkbD7Uuqsr"
            }
        },
        "createdAt": "2018-09-17T08:26:06Z",
        "updatedBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "7fkm1bGT9u8nLkbD7Uuqsr"
            }
        },
        "updatedAt": "2022-12-15T09:11:48Z",
        "organization": {
            "sys": {
                "type": "Link",
                "linkType": "Organization",
                "id": "1kUUWhojvGtUmRyhXfqSwK"
            }
        }
    }
}

//https://api.contentful.com/spaces/TEST_SPACE_ID/environments/master/locales
const localeResponseBody = {
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
                        "id": "2023-06-14-08-27-25",
                        "uuid": "94b6a504-e87c-4d55-9ec0-4a43142e4dfc"
                    }
                },
                "createdBy": {
                    "sys": {
                        "type": "Link",
                        "linkType": "User",
                        "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                    }
                },
                "createdAt": "2023-06-14T08:27:26Z",
                "updatedBy": {
                    "sys": {
                        "type": "Link",
                        "linkType": "User",
                        "id": "7fkm1bGT9u8nLkbD7Uuqsr"
                    }
                },
                "updatedAt": "2023-06-14T08:27:26Z"
            }
        }
    ]
}

//https://api.contentful.com/spaces/TEST_SPACE_ID/environments/master
const masterEnvironmentResponseBody = {
    "name": "2023-06-14-08-27-25",
    "sys": {
        "type": "Environment",
        "id": "master",
        "aliasedEnvironment": {
            "sys": {
                "type": "Link",
                "linkType": "Environment",
                "id": "2023-06-14-08-27-25"
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
        "createdAt": "2023-06-14T08:27:26Z",
        "updatedBy": {
            "sys": {
                "type": "Link",
                "linkType": "User",
                "id": "7fkm1bGT9u8nLkbD7Uuqsr"
            }
        },
        "updatedAt": "2023-06-14T08:27:26Z"
    }
}