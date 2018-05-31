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

// ==============================================================================
// MODEL DEFINITION
// Defined in the /models/burger.js
// ==============================================================================
let db = require("../models");

// ==============================================================================
// ROUTE CONFIGURATION
// ==============================================================================
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // findAll returns all burgers
    db.burger.findAll({
      //Include association between customer and burger
       
      include : [{model: db.customer,attributes: ["customer_id"]}]
    }).then(function(burgers){
      
      var burgerObject = {
        burger : burgers 
      }
      //console.log(JSON.stringify(burgerObject));

       res.render("index", burgerObject);
    });
 
 });

router.post("/api/burgers", function(req, res) {
  //Create a burger and add to the model
  
  db.burger.create({
    //item_id auto increments
     
    burger_name : req.body.burger_name === null? "default name" : req.body.burger_name,
    devoured : req.body.devoured == 0 ? false: true
    //devoured defaults to false
  }).then(function(newCustomer){
    // Now need to create an entry for the customer
     
  }).then(function(){
    // C - Create 
    return res.redirect('/');
  });
});

router.put("/api/burgers/:item_id", function(req, res) {
  //U - Update functionality on burger
   
  db.burger.update({
    devoured : req.body.devoured 
  }, {
    where :{
      item_id : req.params.item_id
    }
  }).then(function(){
    db.burger.findAll({
    }).then(function(burgers){
      
      var burgerObject = {
        burger : burgers 
      }
      //console.log(JSON.stringify(burgerObject));

       res.render("index", burgerObject);
    });
  });
   
});

// POST route which calls Sequelize's create method with a customer name,
// then the update method to attach the name to a burger and mark that burger as eaten.
router.put('/api/new/customer/:id', function(req, res) {
    var customerName = req.body.customer_name;
    db.Customer.create({
        customer_name: customerName
    }).then(function(data) {
        var devoured = false;
        var ID = req.params.id;

        db.Burger.update({
            devoured: devoured,
            CustomerId: data.id},
            {where: {id: ID}}
        ).then(function() {
            res.redirect('/');
        });
    });
});


 
// Export routes for server.js to use.
module.exports = router;
