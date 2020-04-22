const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
const app = express();
const jsonParser = bodyParser.json();
app.use(morgan("dev"));

const authValidation = require("./middleware/authValidation");
app.use(authValidation);

let bookmarks = [
    {
        id: uuid.v4(),
        title: "Bookmark 1",
        description: "First bookmark",
        url: "https://www.google.com",
        rating: 7
    },
    {
        id: uuid.v4(),
        title: "Bookmark 2",
        description: "Second bookmark",
        url: "https://www.facebook.com",
        rating: 1
    },
    {
        id: uuid.v4(),
        title: "Bookmark 2",
        description: "Third bookmark",
        url: "https://www.twitter.com",
        rating: 9
    }
];

app.get('/bookmarks', (req, res) => {
    return res.status(200).json(bookmarks);
});

app.get('/bookmark', (req, res) => {
    const title = req.query.title;

    if (!title) {
        res.statusMessage = "No title sent as param";
        return res.status(406).end();
    }

    let results = [];

    for (let i of bookmarks) {
        if (i.title === title) {
            results.push(i);
        }
    }

    if (!results.length) {
        res.statusMessage = "No items with such title";
        return res.status(404).end();
    }

    res.status(200).json(results);
});

app.post('/bookmarks', jsonParser, (req, res) => {
    const {title, description, url, rating} = req.body;

    if (!title || !description || !url || !rating) {
        res.statusMessage = "Field or fields missing in request body";
        res.status(406).end();
    }

    const newBookmark = {
        id: uuid.v4(),
        title: title,
        description: description,
        url: url,
        rating: rating
    }

    bookmarks.push(newBookmark)

    return res.status(201).json(newBookmark);
});

app.delete('/bookmark/:id', (req, res) => {
    const id = req.params.id;

    const index = bookmarks.findIndex(i => {
        if (i.id === id) {
            return true;
        }
    });

    if (index < 0) {
        res.statusMessage = "No bookmark for specified ID";
        return res.status(404).end();
    }

    bookmarks.splice(index, 1);
    return res.status(200).json({});
});

app.patch('/bookmark/:id', jsonParser, (req, res) => {
    const {id, title, description, url, rating} = req.body;
    const pid = req.params.id;

    if (!id) {
        res.statusMessage = "No ID field in request body";
        return res.status(406).end();
    }

    if (id !== pid) {
        res.statusMessage = "Request body and param ID do not match";
        return res.status(409).end();
    }

    let bookmark = bookmarks.find(i => {
        if (i.id === id) {
            return i;
        }
    });

    if (!bookmark) {
        res.statusMessage = "No bookmark for specified ID";
        return res.status(404).end();
    }

    if (title) {
        bookmark.title = title;
    }

    if (description) {
        bookmark.description = description;
    }

    if (url) {
        bookmark.url = url;
    }

    if (rating) {
        bookmark.rating = Number(rating);
    }

    res.status(202).json(bookmark);
});

app.listen(8080, () => {
    console.log("Server running on localhost:8080");
});