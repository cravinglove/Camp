var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose    = require("mongoose"),
	Campground  = require("./models/campground"),
	seedDB 		= require("./seeds");

mongoose.connect("mongodb://localhost/camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	})
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
	// accept the request body and add it to the campgrounds array
	//res.send("You hit");
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc};
	// Add this object to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			// redirect to the list
			res.redirect("/campgrounds");
		}
	})
});

// NEW - show forms to add new campground
app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
});

// SHOW - show info about any campground
// This must below the NEW route!!!
app.get("/campgrounds/:id", function(req,res){
	// get ID from request
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// console.log(foundCampground);
			// render show template with that ID
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
});

// =============
// COMMENTS ROUTE GOES HERE
// =============

app.get("/campgrounds/:id/comments/new", function(req,res){
	Campground.findById(req.params.id, function (err, campground){
		res.render("comments/new",{campground: campground});		
	})
})

app.listen(3000, function(){
	console.log("server is running..");
})