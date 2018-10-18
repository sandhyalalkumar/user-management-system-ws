const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const content = new Schema({
    imageLink: String,
    description: String,
    keywords:[String],
    heading: String
});

const routeSegment = new Schema({
    source: String,
    destination: String,
    tripMedium: String
});

const blogSchema = new Schema({
    title: { type: String, unique: true, required: true},
    authorId: String,
    authorName: String,
    description: String,
    source: String,
    destination: String,
    route: [routeSegment],
    content:[content]
}, {
    timestamps: true
}); 

module.exports = mongoose.model("blogs", blogSchema);