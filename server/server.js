var express  = require('express');
var app      = express();                       
var mongoose = require('mongoose');          
var morgan = require('morgan');           
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var cors = require('cors');
 
mongoose.connect('mongodb://localhost/userItemList');
 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
var UserItems = mongoose.model('UserItems', {
    title: String,
    description: String,
    priority : Number
});

var AllUsers = mongoose.model('AllUsers', {
    name: String,
    image: String,
    description: String
});

    app.get('/api/items', function(req, res) {
        console.log("fetching items");
        UserItems.find({}).sort({priority: 1}).exec(function(err, items) {
            if (err)
                res.send(err)
 
            res.json(items);
        });
    });
 

    app.post('/api/items', function(req, res) {

        UserItems.create({
            title : req.body.title,
            description : req.body.description,
            priority: req.body.priority
        }, function(err, item) {
            if (err)
                res.send(err);

            UserItems.find(function(err, items) {
                if (err)
                    res.send(err)
                res.json(items);
            });
        });
 
    });
 
    app.delete('/api/items/:item_id', function(req, res) {
        UserItems.remove({
            _id : req.params.item_id
        }, function(err, item) {
            if (err)
            res.send(err);

        UserItems.find(function(err, items) {
            if (err)
                res.send(err)

                console.log(items);
            res.json(items);
        });
 
        });
    });

    app.post('/api/persons', function(req, res) {

        AllUsers.create({
            name : req.body.name,
            image : req.body.image,
            description : req.body.description
        }, function(err, person) {
            if (err)
                res.send(err);
        });
 
    });

    app.get('/api/persons', function(req, res) {
        console.log("fetching persons");
        AllUsers.find(function(err, persons) {
            if (err)
                res.send(err)
 
            res.json(persons);
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");