const express = require('express');
const explorer = require('express-explorer');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  <h1>API is running...</h1>
  <br>
  <a href="./explorer">/explorer</a>`);
});

const userController = require('./controller/userController');
userController(app);

const projectController = require('./controller/projectController');
projectController(app);

const taskController = require('./controller/taskController');
taskController(app);

app.use('/explorer', explorer({ format: 'html' }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
