
const express = require('express');
const explorer = require('express-explorer');

const app = express();
const port = process.env.API_PORT;

const db = require('./database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const userController = require('./controller/userController');
userController(app);

const projectController = require('./controller/projectController');
projectController(app);


app.use('/explorer', explorer({format: 'html'}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})