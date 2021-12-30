// chunk adapted from redux official doc https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
// https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/master/?from-embed=&file=/src/api/server.js:0-3041
// https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/tutorial-steps?file=/src/App.js:0-6
const express = require('express')
const app = express()

const client = async(endpoint, { body, ...customConfig } = {}) => {
    
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    console.log('CLIENT > CLIENT 2 GET INVOKED')
    
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
        ...headers,
        ...customConfig.headers,
        },
    }
    // if (body) { config.body = JSON.stringify(body) } 

    let data
    try {

        const response = await fetch(endpoint, config)
        data = await response.json()
        
        if (response.ok) { 
            console.log('DATA==', data);
            return data 
        }
        throw new Error(response.statusText)
    
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

module.exports.get = (endpoint, customConfig = {}) => {
    console.log('CLIENT > CLIENT 1 GET INVOKED')
    return client(endpoint, { ...customConfig, method: 'GET' })
}

/* client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
} */
