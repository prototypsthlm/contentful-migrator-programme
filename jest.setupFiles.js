const dotenv = require("dotenv");
const {setupInterceptorServer} = require("./traffic/interceptor");

dotenv.config({ path: './.env.test' });

setupInterceptorServer() //todo: only for testing