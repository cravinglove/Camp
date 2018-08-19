var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose    = require("mongoose"),
	Campground  = require("./models/campground"),
	seedDB 		= require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create({
// 	name: "Sans Luis Valley",
// 	image: "https://images.unsplash.com/photo-1519708495087-ca1b71df408c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfa82a18a43ac663a816cab80ad57543&auto=format&fit=crop&w=1056&q=80",
// 	description: "A beautiful camp!"
// }, function(err, campground){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 	}
// })


app.get("/", function(req, res){
	res.render("landing");
})

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds: allCampgrounds});
		}
	})
})

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
})

// NEW - show forms to add new campground
app.get("/campgrounds/new", function(req,res){
	res.render("new");
})

// SHOW - show info about any campground
// This must below the NEW route!!!
app.get("/campgrounds/:id", function(req,res){
	// get ID from request
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// render show template with that ID
			res.render("show", {campground: foundCampground});
		}
	})
})

app.listen(3000, function(){
	console.log("server is running..");
})