
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    "title": {"type": String, "required": true},
    "article": {"type": Schema.Types.ObjectId, "ref": "Blog", "required": true},
    "published": {"type": Date, "required": true},
    "author": {
        "type": Schema.Types.ObjectId,
        "ref": "User"
    }
})

module.exports = mongoose.model("Comment", commentSchema)