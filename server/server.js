var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'gemification',
    api_key: '623882295817265',
    api_secret: 'uo1o5I5dwh8qb6UO-VpZ971aMuw'
});

mongoose.connect('mongodb://localhost/userItemList');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Item details add and retrieve apis start
var UserItems = mongoose.model('UserItems', {
    title: String,
    description: String,
    category: String,
    priority: Number,
    image : String
});

app.get('/api/items', function (req, res) {
    console.log("fetching items");
    UserItems.find({}).sort({ priority: 1 }).exec(function (err, items) {
        if (err)
            res.send(err)

        res.json(items);
    });
});

app.get('/api/items/:item_category', function (req, res) {
    UserItems.find({ 'category': req.params.item_category }).exec(function (err, items) {
        if (err)
            res.send(err)

        res.json(items);
    });
});

app.post('/api/items', function (req, res) {
    UserItems.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        priority: req.body.priority,
        image: req.body.image
    }, function (err, item) {
        if (err)
            res.send(err);

        UserItems.find(function (err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });
});

app.delete('/api/items/:item_id', function (req, res) {
    UserItems.remove({
        _id: req.params.item_id
    }, function (err, item) {
        if (err)
            res.send(err);

        UserItems.find(function (err, items) {
            if (err)
                res.send(err)

            console.log(items);
            res.json(items);
        });

    });
});
//Item details add and retrieve apis end

//User details add and retrieve apis start
var AllUsers = mongoose.model('AllUsers', {
    name: String,
    image: String,
    description: String
});

app.post('/api/persons', function (req, res) {
    AllUsers.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, function (err, person) {
        if (err)
            res.send(err);
    });
});

app.get('/api/persons', function (req, res) {
    console.log("fetching persons");
    AllUsers.find(function (err, persons) {
        if (err)
            res.send(err)

        res.json(persons);
    });
});
//User details add and retrieve apis end

//upload image apis start
app.post('/api/uploadImage', function (req, res) {
    cloudinary.uploader.upload("/Users/admin/Library/Developer/CoreSimulator/Devices/822BDDBE-8537-4477-B587-2DA7FBDFAAD5/data/Containers/Data/Application/DB77632A-DA1C-4B3D-89D8-931A775D32AD/tmp/cdv_photo_002.jpg", function (result) {
        res.json(result);
    });
});
//upload image apis end

app.listen(8080);
console.log("App listening on port 8080");