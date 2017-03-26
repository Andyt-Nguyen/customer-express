var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var app = express();

//Connecting to Database
var db = mongojs('customerapp',['users']);

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//Middleware Static Files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//Global Vars
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});
//Error Validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.get('/', function(req, res){
	db.users.find(function(err, docs){
		console.log(docs);
		res.render('index',
		{
			title:"Customers",
			users: docs
		})
	});
});

app.post('/users/add', function(req, res){
	req.checkBody('first_name','First Name is Required').notEmpty();
	req.checkBody('last_name','Last Name is Required').notEmpty();
	req.checkBody('email','Email is Required').notEmpty();
	console.log(req.body);

	var errors = req.validationErrors();
	if(errors){
		res.render('index',
		{
			title:"Customers",
			users: docs,
			errors: errors
		});
		console.log("Errors");
	} else {
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}
		db.users.insert(newUser, function(err, result){
			if(err){
				console.log(err);
			}
			res.redirect('/');
		})
	}
})


app.listen(3000);
console.log('The server is now running...');
