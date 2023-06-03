const api = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// Get request
api.get('/notes', (req, res) => {
  // read json file
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
  })
});

// post request
api.post('/notes', (req, res) => {
  const { title, text } = {...req.body};
  console.log(req.body)
  if (title && text ) {
    // new note to db with uniuq id
    const newApi = {
      title,
      text,
      id: uuidv4(),
    };
    // pushes the new note
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
// handles delete request
api.delete('/notes/:id', (req, res) => {
  // grabes data
  let db = JSON.parse(fs.readFileSync('db/db.json'));
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  // new data to db file
  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = api;