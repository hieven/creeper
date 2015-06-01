var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;