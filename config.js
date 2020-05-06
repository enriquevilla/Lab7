const DBURL = process.env.DBURL || "mongodb://localhost/bookmarksdb";
const APIKEY = process.env.APIKEY || "2abbf7c3-245b-404f-9473-ade729ed4653";
const PORT = process.env.PORT || "8080";

module.exports = {DBURL, APIKEY, PORT};