var express = require('express'),
    userRouters = require('./routers/userRouter'),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    handleErrors = require("./middleware.js/errorHandler")

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.use('/api', userRouters);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(handleErrors);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

module.exports = app