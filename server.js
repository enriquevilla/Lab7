const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Bookmark = require("./bookmarkModel");
const app = express();
const jsonParser = bodyParser.json();
app.use(morgan("dev"));

const authValidation = require("./middleware/authValidation");
app.use(authValidation);

app.get('/bookmarks', (_, res) => {
    Bookmark
        .getAll()
        .then(d => {return res.status(200).json(d)})
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
});

app.get('/bookmark', (req, res) => {
    const title = req.query.title;

    if (!title) {
        res.statusMessage = "No title sent as param";
        return res.status(406).end();
    }

    Bookmark
        .getByTitle(title)
        .then(d => {
            if (d.length > 0) {
                return res.status(200).json(d);
            } else {
                res.statusMessage = "No items with such title";
                return res.status(404).end();
            }
        })
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
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

    Bookmark
        .createBookmark(newBookmark)
        .then(d => {return res.status(201).json(d)})
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
});

app.delete('/bookmark/:id', (req, res) => {
    const id = req.params.id;

    Bookmark
        .getById(id)
        .then(d => {
            if (d.length !== 0) {
                Bookmark
                    .deleteBookmark(id)
                    .then(_ => {return res.status(200).json({})})
                    .catch(_ => {
                        res.statusMessage = "Something went wrong";
                        return res.status(500).end();
                    });
            } else {
                res.statusMessage = "No bookmark for specified ID";
                return res.status(404).end();
            }
        })
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
});

app.patch('/bookmark/:id', jsonParser, (req, res) => {
    const {id} = req.body;
    let {title, description, url, rating} = req.body;
    const pid = req.params.id;

    if (!id) {
        res.statusMessage = "No ID field in request body";
        return res.status(406).end();
    }

    if (id !== pid) {
        res.statusMessage = "Request body and param ID do not match";
        return res.status(409).end();
    }

    Bookmark
        .getById(id)
        .then(d => {
            if (d.length !== 0) {
                if (!title) {
                    title = d[0].title;
                }
                if (!description) {
                    description = d[0].description;
                }
                if (!url) {
                    url = d[0].url;
                }
                if (!rating) {
                    rating = d[0].rating;
                }
                const newValues = {title, description, url, rating};
                Bookmark
                    .updateBookmark(id, newValues)
                    .then(_ => {
                        Bookmark
                            .getById(id)
                            .then(d => {return res.status(202).json(d)})
                            .catch(_ => {
                                res.statusMessage = "Something went wrong";
                                return res.status(500).end();
                            });
                     })
                    .catch(_ => {
                        res.statusMessage = "Something went wrong";
                        return res.status(500).end();
                    });
            } else {
                res.statusMessage = "No bookmark for specified ID";
                return res.status(404).end();
            }
        })
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
});

app.listen(8080, () => {
    console.log("Server running on localhost:8080");
    new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost/bookmarksdb", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to db successfully");
                return resolve();
            }
        });
    })
    .catch(err => {
        mongoose.disconnect();
        console.log(err);
    });
});