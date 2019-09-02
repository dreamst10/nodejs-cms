const express=require('express');
const app=express();
const path=require('path');
const props=require('./utilities/properties');
const exphbs=require('express-handlebars');
const pg=require('pg');
const logger=require('morgan');


let session=require('express-session');
let passport = require('passport');
let cors = require('cors'); 



//app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');;

app.use(logger('dev'));

app.use(cors({
	origin: '*',
	methods: 'POST, PUT, GET, DELETE, OPTIONS',
	allowedHeaders: 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
	credentials: true
}));


app.use('/',require('./routes/index'));


passport.use(require('./helpers/localStrategy'));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});


app.listen(props.serverPort,()=>{
    console.log('listening on port ' + props.serverPort);
})