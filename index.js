const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8888;
const users = [
  { id: 1, user: 'admin', password: 'admin' },
  { id: 2, user: 'guest', password: 'guest' },
];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .send('Username and password are required');
    return;
  }

  const user = users.find(u => {
    return u.user === username && u.password === password;
  });

  if (!user) {
    res
      .status(401)
      .send('User not found');
    return;
  }

  const secret = 'my_secret_key';
  const tokenExpiry = '3 hours';
  const token = jwt.sign({
    sub: user.id,
    username,
  }, secret, { expiresIn: tokenExpiry });

  res
    .status(200)
    .send({ access_token: token });
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
