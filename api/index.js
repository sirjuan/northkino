'use strict'

const app = require('express')();

const express = require('express');

console.log(process.env)

const { MONGO_CREDS, PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_APP_SECRET } = process.env;



app.use([

  require('./setHeaders'),
]);




app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api_router'));

app.use(require('./errorHandlers'));



app.listen(API_PORT, () => console.log(`API Running on ${PORT}`) );
