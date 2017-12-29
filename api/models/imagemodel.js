var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    name : String,
    value: []
});

module.exports = mongoose.model('imageSchema', imageSchema);