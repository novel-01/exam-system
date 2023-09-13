const express = require('express');
const {connect} = require('mongoose');
const config = require('../config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const bootstrap = async () => {
    await connect(config.dbUrl);
    app.listen(config.port, () => {
        console.log(`App listening on port: ${config.port}`);
    })
}

bootstrap();