var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var scrapper = require('./api/controllers/scrapperImages');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:admin@ds133597.mlab.com:33597/darwin_yash';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use('/', index);
// app.use('/users', users);

app.get('',function(req,res){
	res.sendFile(__dirname+ '/views/welcome.html');
})

app.post('/imageSearch', function(req, res){
		//console.log(req.body);
		scrapper.scrappingImages(req.body.keyword);
	// 	var keyword = req.body.keyword
	// 	console.log(keyword)
	// 	var find_keyword_instance = mongoose.model('google_model', google_record);
	// 	find_keyword_instance.find({keyword_name: keyword.toUpperCase() }, function (err, find_keyword_instance){
	// 	if (err) return handleError(err);

	// 	if (find_keyword_instance.length > 0) {
	// 		console.log('Value already in DB');
	// 		res.redirect('images?'+keyword.toUpperCase());
	// 	}
	// 	else{
	// 			var instance_insert_keyword = mongoose.model('google_model', google_record);
	// 			//PUSHING KEYWORD TO DB
	// 			instance_insert_keyword.create({ keyword_name: keyword.toUpperCase() }, function (err, instance_insert_keyword){
	// 			if (err) return handleError(err);
	// 			console.log('saved');
	// 			});

	// 			var result_instance = mongoose.model('google_model', google_record);
	// 			var query = result_instance.find().lean();
	// 			query.select('keyword_name');
	// 			query.exec(function (err, result) {
	// 			if (err) return handleError(err);
	// 			//SCRAPING HERE
	// 			var db_instance = mongoose.model('google_model', google_record );
	// 			scraper.myScraper(keyword,db_instance,res);
	// 			})
	// 		}
	// })
})

app.get('/history',function(req,res){
	res.sendFile(__dirname+ '/views/history.html');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
