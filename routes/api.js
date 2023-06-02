const api = require('express').Router();
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


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


  module.exports = api;