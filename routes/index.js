var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var upload = require("../config/multer");
var middleware = require("../middleware");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register" , function(req , res){
    res.render("register");
});

router.get("/myProfile" , middleware.isLoggedIn , function(req , res ){
             res.render("myProfile");
});

router.get("/contact" , function(req , res ){
        res.render("contact");
});


router.post("/register" , function(req , res){
    var newUser = new User({username : req.body.username, email : req.body.email , mobile : req.body.mobile, address : req.body.address , image : req.body.image});
    console.log(newUser);
    User.register(newUser , req.body.password , function(err , user){
        if(err){
              req.flash("error" , err.message);
              return res.render("register");
        }
        passport.authenticate("local")(req , res , function(){
             req.flash("success" , "Welcome to YelpCamp " + user.username);
             res.redirect("/campgrounds");
        });
    });
});

router.get("/login" , function(req , res ){
    res.render("login");
});

router.post("/login" , passport.authenticate("local" , {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req , res ){
});

router.get("/logout" , function(req , res ){
    req.logout();
    req.flash("success" , "Logged You oUt");
    res.redirect("/campgrounds");
});





router.put("/upload/profile/picture", middleware.isLoggedIn, function(req, res){
  upload(req,res,function(err) {
    if(err) {
      console.log(err);
        return res.send("Error uploading file.");
    }
    if(req.file == undefined){
      req.flash("error", "First select image to upload");
      return res.redirect("back");
    }
    var image;
    if(req.file){
      image = req.file.path;
    }else {
      image = req.user.image;
    }
    console.log(image);
    User.findByIdAndUpdate(req.params.id, {image: image}, function(err, user){
      if(err){
        console.log(err);
        req.flash("error", "Error in uploading picture");
      }else {
        req.flash("success", "Picture updated successfully");
        res.redirect("/");
      }
    });
  });
});




module.exports = router;