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

// api.post('/notes', (req, res) => {
//   console.log(req.body);

//   const { isValid, errors } = req.body;

//   const payload = {
//     title: req.body.title,
//     text: req.body.text,
//     id: uuidv4(),
//   }
//   if (!isValid) {
//     readAndAppend(payload, './db/db.json');
//     res.json(`Diagnostic information added 🔧`);
//   } else {
//     res.json({
//       message: 'Object is valid, not logging. Check front end implementation',
//       error_id: payload.error_id,
//     });
//   }
// });


// api.post('/notes', (req, res) => {
//   let db = fs.readFileSync('db/db.json');
//   db = JSON.parse(db);
//   res.json(db);
//   let userNote = {
//     title: req.body.title,
//     text: req.body.text,
//     id: uuidv4(),
//   };
//   db.push(userNote);
//   fs.writeFileSync('db/db.json', JSON.stringify(db));
//   res.json(db);

// });

  module.exports = api;