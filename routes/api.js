const api = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

api.get('/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
  })
});


api.post('/notes', (req, res) => {
  const { title, text } = {...req.body};
  console.log(req.body)
  if (title && text ) {
    const newApi = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newApi, 'db/db.json');
    const response = {
      status: 'success',
      body: newApi,
    };
    res.json(response);
  } else {
    res.json('Error in posting text');
  }
});

api.delete('/notes/:id', (req, res) => {
  let db = JSON.parse(fs.readFileSync('db/db.json'));
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = api;