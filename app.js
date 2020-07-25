var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var passport =require('passport');
var flash=require('connect-flash');
var LocalStrategy=require('passport-local');
var passportlocalmongoose=require('passport-local-mongoose');
var methodOverride=require('method-override')
//=============================
var commentroutes=require('./routes/comment.js')
var authroutes =require('./routes/index.js')
var campgroundroutes=require('./routes/campground.js')
app.use(methodOverride("_method"));

app.use(flash());
//==============================
var campgrounds=require('./models/campgrounds.js')
var Comment=require('./models/comments.js')
var User=require('./models/user.js');
//==============================
var seed=require('./seeds.js') // this will return function name which will further be called by variable seed
//seed();
app.use(bodyParser.urlencoded({extended:false}));
//=============================

//=============================
app.use(require('express-session')({
    secret:"rusty is still the best",
    resave:false,
    saveUninitialized:false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============================
app.use(function(req,res,next)
{
res.locals.currentUser=req.user;
res.locals.error=req.flash("error");
res.locals.success=req.flash("success")
next();
});
//==============================
app.use(authroutes);
app.use(campgroundroutes);
app.use(commentroutes);

//==============================
app.use(express.static(__dirname +"/public"));
app.set("view engine","ejs");
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/campgrounds_v4",{useNewUrlParser:true,useUnifiedTopology:true });//db name is campgrounds



app.listen(3000,function(){

    console.log("campground server has started");
});