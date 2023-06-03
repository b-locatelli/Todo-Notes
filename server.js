// my dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/index.js')

// uses expreess
const app = express();
// port for the application
const PORT = process.env.PORT || 3001;

// handles my data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api)

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);