var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//Middleware Static Files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//Error Formatter
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

var users = [
	{
		id: 1,
		first_name: "Andrew",
		last_name: "Nguyen",
		email: "andythenge@gmail.com"
	},
	{
		id: 2,
		first_name: "Sam",
		last_name: "Harris",
		email: "sam@gmail.com"
	},
	{
		id: 3,
		first_name: "Dwight",
		last_name: "Schrute",
		email: "schrute@gmail.com"
	},
	{
		id: 4,
		first_name: "Pam",
		last_name: "Beasly",
		email: "beasly@gmail.com"
	},
];

app.get('/', function(req, res){
	res.render('index',{title:"Customers", users: users})
});

app.post('/users/add', function(req, res){
	var errors = req.validationErrors();
	req.checkBody('first_name','First Name is Required').notEmpty();
	req.checkBody('last_name','Last Name is Required').notEmpty();
	req.checkBody('email','Email is Required').notEmpty();
	console.log(req.body);

	if(errors){
		console.log("Errors");
	} else {
		var user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}
		console.log("Success!");
	}
})


app.listen(3000);
console.log('The server is now running...');
