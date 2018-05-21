var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
   	image1: String,
      image2: String,
      image3: String,
      image4: String,
   	description: String,
      category: String,
      days: Number,
      nights: Number,
      author: {
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         username: String,
         email : String,
         mobile : Number,
         address : String,
         image : String
      },
   	comments: [
      		{
         			type: mongoose.Schema.Types.ObjectId,
         			ref: "Comment"
      		}
   	]
},{
	usePushEach: true
});

module.exports = mongoose.model("Campground", campgroundSchema);