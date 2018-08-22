var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose    = require("mongoose"),
	passport	= require("passport"),
	LocalStrategy = require("passport-local"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	User   	 	= require("./models/user"),
	seedDB 		= require("./seeds");

mongoose.connect("mongodb://localhost/camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
	});
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
	});
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
	});
});

// =============
// COMMENTS ROUTE GOES HERE
// =============

app.get("/campgrounds/:id/comments/new", function(req,res){
	Campground.findById(req.params.id, function (err, campground){
		res.render("comments/new",{campground: campground});		
	});
});

app.post("/campgrounds/:id/comments", function(req,res){
	// look up the campground
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					// connect the comment to campground
					campground.comments.push(comment);
					campground.save();
					// redirect to show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// =========
// AUTH ROUTE
// =========

// show register form
app.get("/register", function(req, res) {
	res.render("register");
});
// Handle sign up logic
app.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/campgrounds");
		});
	});
});

app.listen(3000, function(){
	console.log("server is running..");
});