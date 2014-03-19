var mongoose = require('mongoose');
var pastycheSchema = new mongoose.Schema({
    title: String,
    description: String,
    forgroundImages: Array,
    backgroundImage: {},
    tags: Array
});

var PastycheModel = module.exports = mongoose.model('Pastyche', pastycheSchema);