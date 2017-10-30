var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "mongodb://Tim4382:rangers14@ds157444.mlab.com:57444/cidm4382";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

/*
{
    "_id": {
        "$oid": "59dbc45be472874901bb842c"
    },
    "weight": "26000",
    "vfriFlap5": "137",
    "vfriFlap10": "128",
    "vfriFlap15": "125",
    "vclimb": "148"
}
*/

var climbDataSchema = new mongoose.Schema({
    weight: Number,
    vfriFlap5: Number,
    vfriFlap10: Number,
    vfriFlap15: Number
});


var ClimbData = mongoose.model('CilmbData', climbDataSchema, 'ClimbData');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.send('Hello, this is just a test');
    //res.render('index', { title: 'Express' });

    console.log("I am here");

    ClimbData.find({}, function(err, climbdatas) {
        if (err) {
            res.send(err);
            return console.error(err);
        }

        var output = "";
        
        climbdatas.forEach(function(climbdata){
            console.log(climbdata.weight);
            output += "weight: " + climbdata.weight + "<br>";
        });

        res.send(output);
    });
});

module.exports = router;
