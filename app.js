var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/campgrounds", function(req, res){
	var campgrounds = [
	{name: "Yellowknife", image: "https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2133a2e6648c39b6d1845bcc603b09ce&auto=format&fit=crop&w=1050&q=80"},
	{name: "Sans Luis Valley", image: "https://images.unsplash.com/photo-1519708495087-ca1b71df408c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfa82a18a43ac663a816cab80ad57543&auto=format&fit=crop&w=1056&q=80"},
	{name: "Flaming Gorge", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80"}
	];
	res.render("campgrounds",{campgrounds: campgrounds});
})

app.listen(3000, function(){
	console.log("server is running..");
})