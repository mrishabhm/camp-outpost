var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req , res , next ){
        if(req.isAuthenticated()){
                 Campground.findById(req.params.id , function(err , foundCampground){
                        if(err){
                            req.flash("error" , "Could not found the campground you are looking for");
                            res.redirect("back");
                        } else{
                                //match the author with the user
                                if(foundCampground.author.id.equals(req.user._id)){
                                        next();
                                } else{
                                        req.flash("error" , "You do not have any permission to do that");
                                        res.redirect("back");
                                }
                            
                        }
                 });
        } else {
            req.flash("error" , "Can not add a campground easily");
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership = function(req , res , next ){
        if(req.isAuthenticated()){
                 Comment.findById(req.params.comment_id , function(err , foundComment){
                        if(err){
                            res.redirect("back");
                        } else{
                                //match the author with the user
                                if(foundComment.author.id.equals(req.user._id)){
                                        next();
                                } else{
                                        req.flash("error" , "You don't have permission to do that");
                                        res.redirect("back");
                                }
                        }
                 });
        } else {
            req.flash("error" , "You must be logged in to do that");
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function(req , res , next){
    if(req.isAuthenticated()){
          return next();
    }
    req.flash("error" , "You must be logged in to do that");
    res.redirect("/login"); 
};



module.exports = middlewareObj;