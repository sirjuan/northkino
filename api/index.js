const app = require('express')();

const express = require('express');

console.log(process.env)

const { PORT} = process.env;

app.use([
  require('./setHeaders'),
]);

app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api_router'));

app.use(require('./errorHandlers'));

app.listen(PORT, () => console.log(`API Running on ${PORT}`) );
