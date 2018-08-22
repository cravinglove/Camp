# Camp

* Add landingpage route
* Add campgrounds page route to list all grounds
* Each campground has name and image

# Layout and basic style

* Create header and footer partials
* Add Bootstrap

# Creating new campgrounds

* Add campground POST route
* install body-parser
* show forms that can handle add request

# Style the campground page

* make header/title beautiful
* display campgrounds in grid system

# Style the navbar and form

* make navbar that all pages can use
* have the form look some betters

# Add mongoose

* install and configure mongoose
* set up campground model
* use campground model inside route

# Show page

* RESTful routes

| name   | url       | verb | desc.                            |
|--------|-----------|------|----------------------------------|
| INDEX  | /cats     | GET  | show all cats                    |
| NEW    | /cats/new | GET  | display forms to create new cats |
| CREATE | /cats     | POST | add new cat to DB                |
| SHOW   | /cats/:id | GET  | show info about one cat          |

* add description to our camps
* make a show route

# Refactor mongoose code

* make a models directory
* module.exports
* require each model rightly

# Add seeds file

* add a seeds.js file
* run seeds file every time server starts

# Add comment model

* make error go away
* show comments on campground page

# Comment new/create

* nested routes

| name   | url                           | verb | desc.                                              |
|--------|-------------------------------|------|----------------------------------------------------|
| INDEX  | /campgrounds                  | GET  | show all campgrounds                               |
| NEW    | /campgrounds/new              | GET  | display forms to create new campgrounds            |
| CREATE | /campgrounds                  | POST | add new campground to DB                           |
| SHOW   | /campgrounds/:id              | GET  | show info about one campground                     |
| NEW    | /campgrounds/:id/comments/new | GET  | display forms to create new comments               |
| CREATE | /campgrounds/:id/comments     | POST | add new comments associated with campgrounds to DB |

* add the comments new/create route
* add form to submit comment

# Style Show Page

* Add a sidebar to showpage
* Display comments nicely

# Auth Pt. 1 - Add user model

* Install all packages for auth
* define user model

# Auth Pt. 2 - Add register

* Configure passport
* add register route
* add register template