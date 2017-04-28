var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require ("dotenv").config();

var config = require("./config");

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

var runServer = function(callback) {
	console.log(config.DATABASE_URL);
	mongoose.connect(config.DATABASE_URL, function(err){
		if (err && callback) {
			return callback(err);
		}
        
		app.listen(config.PORT, function(){
			console.log("listening on localhost:" + config.PORT);
			if (callback) {
				callback();
			}
           
		});

	});
};

if (require.main === module) {
	runServer(function (err) {
		if (err) {
			console.error(err);
		}
	});
}


// routes 
var Item = require("./models/item");

app.get("/items", function(req, res){
	Item.find(function(err,items){
		if(err){
			return res.status(500).json({
				message: "internal Server Error"
			});
		}
		res.json(items);
	});
});

app.post("/items" , function(req,res){
	Item.create({
		name:req.body.name
	}, function(err, item) {
		if (err) {
			return res.status(500).json({
				message:"Internal Server Error"
			});
		}
		res.status(201).json(item);
    
	});
});


app.use("*", function(req,res){
	res.status(404).json({
		message: "Not Found"
	});
});


exports.app = app;
exports.runServer = runServer;



