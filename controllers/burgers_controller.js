// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// Declares router and assigns it express instance
// ==============================================================================
var router = express.Router();
// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// ==============================================================================
// ROUTE CONFIGURATION
// ==============================================================================
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var burgerObject = {
      burger: data
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
  });
 });

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:item_id", function(req, res) {
  var condition = "item_id = " + req.params.item_id;
  console.log("condition", condition);
 burger.update(
   {
     devoured: req.body.devoured
   },
   condition,
   function(result) {
     if (result.changedRows === 0) {
     // If no rows were changed, then the ID must not exist, so 404
       return res.status(404).end();
     }
     
     //Result = 200...good to go
      res.status(200).end();
     }
  );
});
 
// Export routes for server.js to use.
module.exports = router;
