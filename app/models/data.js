/**
 * Created by kshitiz on 5/4/15.
 */
var mongoose = require('mongoose');


var Data = mongoose.Schema({
  bytesLeft: {type: Number, required: true},
  date: {type: Date, required: true}
});

var Data = mongoose.model('Data', Data);
exports.Data = Data;
