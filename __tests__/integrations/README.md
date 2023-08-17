# Integration tests

These tests are meant to test the integrations to contentful.
The purpose of these tests are to run the code towards a real contentful space. 

## Setup

There are two ways to enable integration tests. 
The safest option is to create a new contentful space dedicated to running the tests.
The other option is to run the tests against an existing contentful space but with an environment dedicated to running the tests.


1. Create a contentful space
2. Add env variables to `.env.test` file
    1. `CONTENTFUL_SPACE_ID` - the id of the contentful space
    2. `CTF_ENVIRONMENT_ID` - the environment to run the tests in
    3. `CTF_CMA_TOKEN` - the access token for the contentful space

## Usage

1. There are 2 utility functions that needs be used before running the tests. 
    1. `setupTestContentfulSpace` - creates a contentful space
    2. `resetTestContentfulSpace` - deletes a contentful space
2. Run `npm run test:integration` to run the tests -- CHECK THIS