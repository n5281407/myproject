var mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
    uuid: String,
    content: String,
    timestamp: Number
});

var document = mongoose.model('Document', documentSchema);

module.exports = document;