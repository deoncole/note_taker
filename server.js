// require the express package
const express = require('express');
// require the file system
const fs = require('fs');
// require teh path for working with file and directory paths
const path = require('path');

// set an enviornment to use the port neccessary for Heroku
const PORT = process.env.PORT || 3001;

// require the notes json
const { notes } = require('./db/notes');

// create an instantiate the server and start express with app const
const app = express();

app.use(express.static('public'));

// route to access the main api and loads the html. the '/' is the base of the route. Change app to router so that it listens on the same server
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res)=>{
    let results = notes;
    console.log(req.query);
    res.json(results);
});

// start listening
app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
})