var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment");

var data = [
	{
		name: "Yellowknife",
		image: "https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2133a2e6648c39b6d1845bcc603b09ce&auto=format&fit=crop&w=1050&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada dui ut ultrices gravida. Nam sit amet dapibus arcu. Nulla facilisi. Maecenas ultrices velit at eros aliquam congue. Praesent et risus velit. Nam eget hendrerit mi. Maecenas lacinia viverra arcu id faucibus. Quisque consectetur rutrum lorem id pulvinar. Proin a sollicitudin lectus, ac vulputate libero. Praesent consectetur, orci quis vulputate volutpat, mi augue vulputate sem, ac mollis est mauris eget diam. Morbi id ornare erat. Suspendisse posuere sapien vitae quam feugiat condimentum vel non mauris. Mauris a porta massa, ut interdum turpis. Donec venenatis porttitor congue. Vestibulum mauris turpis, convallis at erat vitae, facilisis interdum tellus. Morbi bibendum mi eu felis vestibulum egestas."
	},
	{
		name: "Sans Luis Valley",
		image: "https://images.unsplash.com/photo-1519708495087-ca1b71df408c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfa82a18a43ac663a816cab80ad57543&auto=format&fit=crop&w=1056&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada dui ut ultrices gravida. Nam sit amet dapibus arcu. Nulla facilisi. Maecenas ultrices velit at eros aliquam congue. Praesent et risus velit. Nam eget hendrerit mi. Maecenas lacinia viverra arcu id faucibus. Quisque consectetur rutrum lorem id pulvinar. Proin a sollicitudin lectus, ac vulputate libero. Praesent consectetur, orci quis vulputate volutpat, mi augue vulputate sem, ac mollis est mauris eget diam. Morbi id ornare erat. Suspendisse posuere sapien vitae quam feugiat condimentum vel non mauris. Mauris a porta massa, ut interdum turpis. Donec venenatis porttitor congue. Vestibulum mauris turpis, convallis at erat vitae, facilisis interdum tellus. Morbi bibendum mi eu felis vestibulum egestas."
	},
	{
		name: "Flaming Gorge",
		image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1050&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada dui ut ultrices gravida. Nam sit amet dapibus arcu. Nulla facilisi. Maecenas ultrices velit at eros aliquam congue. Praesent et risus velit. Nam eget hendrerit mi. Maecenas lacinia viverra arcu id faucibus. Quisque consectetur rutrum lorem id pulvinar. Proin a sollicitudin lectus, ac vulputate libero. Praesent consectetur, orci quis vulputate volutpat, mi augue vulputate sem, ac mollis est mauris eget diam. Morbi id ornare erat. Suspendisse posuere sapien vitae quam feugiat condimentum vel non mauris. Mauris a porta massa, ut interdum turpis. Donec venenatis porttitor congue. Vestibulum mauris turpis, convallis at erat vitae, facilisis interdum tellus. Morbi bibendum mi eu felis vestibulum egestas."
	}
];

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("remove all campgrounds");
			// Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					}else{
						console.log("add one campground");
						// Create comment
						Comment.create({
							text: "if there can have internet..",
							author: "Hower"
						}, function(err, comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("create new comment");
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;