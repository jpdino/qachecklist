var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/digitalproducer/:jobnumber', function(req, res, next){
	var db = req.db;
	var collection = db.get('qachecklist');
	var _jobnumber = req.params.jobnumber;
	collection.find({ 'jobnumber': { $eq: _jobnumber } },{},function(e,docs){
		res.renderWithData('digitalproducer', {}, docs);
	});
});

// Get specific Job number
router.get('/jobnumbers/:jobnumber', function(req, res, next){
	var db = req.db,
		collection = db.get('qachecklist'),
		_jobnumber = req.params.jobnumber;
	collection.find({ 'jobnumber': { $eq: _jobnumber } },{},function(e,docs){
		res.send(docs);
	});
});

// Get Jobs
router.get('/jobs', function(req, res, next){
	var db = req.db,
		collection = db.get('qachecklist');
	collection.find({},{},function(e,docs){
		res.send(docs);
	});
});

router.get('/clean', function(req, res, next){
	var db = req.db,
		collection = db.get('qachecklist');
	collection.remove({},{},function(e,docs){
		res.send(docs);
	});
});

router.post('/adddata', function(req, res, next){
	var db = req.db;
	var collection = db.get('qachecklist');
	collection.insert(req.body, function(err, result){
		res.send(
			err === null ? {msg:'', 'result': result} : {msg: 'error :' + err}
		);
	});
});


module.exports = router;
