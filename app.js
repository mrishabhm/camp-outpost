var express                                 = require("express"),
    app                                         = express(),
    bodyParser                              = require("body-parser"),
    mongoose                                 = require("mongoose"),
    multer                                      = require("multer"),
    Campground                             = require("./models/campground"),
    methodOverride                       = require("method-override"), 
    flash                                       = require("connect-flash"),
    passport                                  = require("passport"),
    LocalStrategy                          = require("passport-local"),
    User                                        = require("./models/user"),
    Comment                                   = require("./models/comment"),
    seedDB                                     = require("./seeds")

var indexRoutes          = require("./routes/index"),
      campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes      = require("./routes/comments")

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/camp_out");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// seedDB();

app.use(require("express-session")({
	secret : "Our friends group is the best",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res , next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/" , indexRoutes);
app.use("/campgrounds" , campgroundRoutes);
app.use("/campgrounds/:id/comments" , commentRoutes);


app.listen(3000, function(){
   console.log("The Camp-OutPost Server Started at Port 3000 !!!");
});