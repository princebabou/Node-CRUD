const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const debug = require('debug');
const router = require('./routes/employee.js');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger.js');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();


mongoose.connect(process.env.DB)
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Database Connection Established!')
});

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.json())

const specs=swaggerJSDoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

app.use('/employee', router);
process.env.SUPPRESS_NO_CONFIG_WARNING = true;



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
});

