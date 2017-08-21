// var mongo = require('mongodb');
// var mongoose = require('mongoose');

module.exports = function(mongo,mongoose) {
	var datab = mongoose.connection;
	mongoose.connect('mongodb://localhost/loginapp', {
	  useMongoClient: true,
	  /* other options */
	}); 
}