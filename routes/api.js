const api = require('express').Router();
const path = require('path')
const fs = require('fs')
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
  const { title, text } = req.body;
  console.log(req.body)
  if (title && text ) {
    const newApi = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newApi, './db/db.json');
    const response = {
      status: 'success',
      body: newApi,
    };
    res.json(response);
  } else {
    res.json('Error in posting text');
  }
});

  module.exports = api;