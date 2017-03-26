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
	console.log(req.body);
})


app.listen(3000);
console.log('The server is now running...');
