
const express = require('express');

const app = express();
const port = process.env.API_PORT;

const db = require('./database');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
