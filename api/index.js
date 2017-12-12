const app = require('express')();
const path = require('path')

const express = require('express');

const { PORT} = process.env;

app.use([

  require('./setHeaders'),
]);


// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../build')));


app.use('/api', require('./routes/api_router'));

app.use('*', require('./routes/root'));


app.use(require('./errorHandlers'));

app.listen(PORT, () => console.log(`API Running on ${PORT}`) );
