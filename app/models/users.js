/**
 * Created by kshitiz on 5/4/15.
 */
var mongoose = require('mongoose');

var User = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  secondName: {type: String, required: true}
});


var User = mongoose.model('User', User);
exports.User = User;
