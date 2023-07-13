#!/usr/bin/env node
const { rest } = require('msw')
const fs = require('fs')
const path = require('path')
const { setupServer } = require('msw/node')
const log = require('../lib/log')

const requests = new Map()
const transactions = new Set()
const server = setupServer()

//this utility can be used to record all network traffic.
// Each request and response during app lifetime is logged to json in the traffic/output directory.
//run setupInterceptorServer() in bin/cmp.js for this to work.
module.exports.setupInterceptorServer = () => {
    log.info('setting up network traffic interceptor server')

    //catch requests from underlying dependencies
    server.listen({
        onUnhandledRequest(req) {
            log.warn(`* Found an unhandled ${req.method} request to ${req.url.href}`)
        },
    })

    server.events.on('request:start', (request, response) => {
        // Record every dispatched request.
        log.info(`* intercepting ${request.method} request to ${request.url}`)
        requests.set(request.id, request)
        transactions.add([request, response])
    })

    // Since we're not providing any request handlers
    // to the "setupServer" call, all responses will be
    // bypassed (performed as-is). This will allow us to
    // collect the actual responses.
    server.events.on('response:bypass', (response, requestId) => {
        log.info(`* receiving status ${response.status} from ${requests.get(requestId).url}`)
        const request = requests.get(requestId)
        transactions.add([request, response])
    })

    process.on('exit', () => {
        log.info('handling exit')
        this.writeTrafficToFile()
    })
}

module.exports.writeTrafficToFile = () => {
    const json = []
    for (const [request, response] of transactions.entries()) {
        json.push({ request, response })
    }

    let currentTime = new Date().getTime().toString()
    let filePath = path.resolve(__dirname, `output/traffic-${currentTime}.json`)
    let jsonString = JSON.stringify(json, null, 2)

    fs.writeFileSync(filePath, jsonString)
}
