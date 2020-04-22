const uuid = require("uuid");

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

module.exports = bookmarks;