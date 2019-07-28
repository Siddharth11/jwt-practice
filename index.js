const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const user = req.body.username;

  res
    .status(200)
    .send(`Logged in with user: ${user}`);
});

app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleTimeString();

  res.status(200).send(`Server time: ${localTime}`);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server running on: http://127.0.0.1:${PORT}`);
});
