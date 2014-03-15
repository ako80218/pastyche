var mongoose = require('mongoose');
var pastycheSchema = new mongoose.Schema({
    pastyche: Array,
    backgroundImage: {}
});

var PastycheModel = module.exports = mongoose.model('Pastyche', pastycheSchema);