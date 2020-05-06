const mongoose = require("mongoose");
const uuid = require("uuid");

const bookmarkCollectionSchema = mongoose.Schema({
    id: {
        type: uuid,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const bookmarksCollection = mongoose.model("bookmarks", bookmarkCollectionSchema);

const getAll = () => {
    return bookmarksCollection
        .find()
        .then(d => {return d})
        .catch(err => {return err});
};

const getByTitle = (title) => {
    return bookmarksCollection
        .find({title: title})
        .then(d => {return d})
        .catch(err => {return err});
};

const createBookmark = (newBookmark) => {
    return bookmarksCollection
        .create(newBookmark)
        .then(d => {return d})
        .catch(err => {return err});
};

const deleteBookmark = (id) => {
    return bookmarksCollection
        .deleteOne({id: id})
        .then(d => {return d})
        .catch(err => {return err});
};

const updateBookmark = (id, {title, description, url, rating}) => {
    return bookmarksCollection
        .updateOne({id: id}, {$set: {title: title, description: description, url: url, rating: rating}})
        .then(d => {return d})
        .catch(err => {return err});
};

const getById = (id) => {
    return bookmarksCollection
        .findOne({id: id})
        .then(d => {return d})
        .catch(err => {return err});
};

module.exports = {getAll, getByTitle, createBookmark, deleteBookmark, updateBookmark, getById};