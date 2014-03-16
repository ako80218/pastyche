var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PastycheModel = require('./pastycheModel.js');
var userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userDisplayName: String,
    userSlug: String,
    pastyches: [{type:Schema.Types.ObjectId, 
    ref:'Pastyche'
    }],
    profile: {}
});
var passportLocalMongoose = require('passport-local-mongoose');
userSchema.plugin(passportLocalMongoose);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var UserModel = module.exports = mongoose.model('User', userSchema);