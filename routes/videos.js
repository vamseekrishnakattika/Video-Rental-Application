var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/video_rental');

router.get('/',function(req, res){
	var collection = db.get('videos');
	collection.find({userId: req.user.username},function(err,videos){
		if(err) throw err;
		res.json(videos);
	});
});

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        userId: req.user.username,
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;
        res.json(video);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;
      	res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        userId: req.user.username,
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;
        res.json(video);
    });
});

module.exports = router;