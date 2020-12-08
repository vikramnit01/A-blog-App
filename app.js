var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override")
    flash          = require("connect-flash");


var commentRoutes    =require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes      =require("./routes/index");

    
var Campground   =require("./models/campground.js");
var Comment      =require("./models/comment");
var User         =require("./models/user");
var seedDB       =require("./seeds.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB() ;  seed the data base
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
//passport congiguration

app.use(require("express-session")({
    secret : "Once again Rusty wins cutest dog!",
    resave : false,
    saveUnitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req ,res ,next){        //it is empty if no one use
    res.locals.currentUser=req.user; //it givers username who logged in
    res.locals.error  =req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);  //for shorting the code
app.use("/campgrounds/:id/comments",commentRoutes);
 
app.listen(3000,function(){
    console.log("yepCamp connected");
});