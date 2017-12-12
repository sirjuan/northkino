const app = require('express')();
const path = require('path')

const express = require('express');

const { PORT} = process.env;
app.use(express.static(path.join(__dirname, '../build', 'static')))
app.use([

  require('./setHeaders'),
]);

app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api_router'));

app.use(require('./errorHandlers'));

app.listen(PORT, () => console.log(`API Running on ${PORT}`) );
