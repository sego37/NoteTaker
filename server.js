const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.get("/api/notes", (req, res) => {

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        const notes = JSON.parse(data)
        res.send(notes)
    })


})


app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        const notes = JSON.parse(data)

        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), function(err) {
            if (err) throw err;
            res.send(notes)
        })
    })
})


// app.get("/assets/css/styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"))
// })

// /assets/js/index.js


app.listen(3001, () => {
    console.log('App listening on port 3001!');
});