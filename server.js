// require the express package
const express = require('express');
// require the file system to write to the json file
const fs = require('fs');
// require teh path for working with file and directory paths
const path = require('path');

// set an enviornment to use the port neccessary for Heroku
const PORT = process.env.PORT || 3001;

// require the notes json
const { notes } = require('./db/notes');

// create an instantiate the server and start express with app const
const app = express();

// middleware to take in the POST data and convert it to key/value pairs.
app.use(express.urlencoded({extended: true}));
// convert the POST data into json
app.use(express.json());

app.use(express.static('public'));

// function to accept the POST route and the array to adding to the json file. create a const to hold all of the notes. push teh new note into the array. write the updated note to the file. return the new note body
function addNote (body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({notes: noteArray}, null, 2)
    );
    return newNote;
};

// route to access the main api and loads the html. the '/' is the base of the route. Change app to router so that it listens on the same server
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// route to open up the notes html page
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// route to get the json notes
app.get('/api/notes', (req, res)=>{
    let results = notes;
    console.log(req.body);
    res.json(results);
});

// route to post the note to the server
app.post('/api/notes', (req, res) =>{
    let results = notes;
    console.log(req.body);
    const allNotes = addNote(req.body, notes)
    res.json(allNotes);
});

// start listening
app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
})