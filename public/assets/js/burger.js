// Make sure we wait to attach our handlers until the DOM is fully loaded.
// Note that the examples from class simply call a function, 
// I'm calling the document.ready to be sure document loads and because of
// muscle memory

$(document).ready(function(){
    
  //From the main section,  the user is creating a new burger
  $(".createBurger").on("submit", function(event) {
    // Prevent default action
    event.preventDefault();
    //Clear the error message
    $('#errorMessage').text("");

    var newBurgerName = $("#burger-name").val().trim();
    if(newBurgerName === '' ){
        $('#errorMessage').text("Please enter a name for the burger");
        return;
    }

    var newBurger = {
      burger_name: newBurgerName,
      devoured: $("[name=devoured]:checked").val().trim()
    };
    
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
      }).then(
        function() {
        location.reload();
      }
      );
    });

  $(".eatburger").on("click", function(event) {
    var item_id = $(this).data("id");
  
    var newBurgerState = {
      devoured: true
    };
    // Send the PUT request.
    $.ajax("/api/burgers/" + item_id, {
       type: "PUT",
       data: newBurgerState
    }).then(function() {
        console.log("changed devoured to", newBurgerState.devoured);
        // Reload the page to get the updated list
        location.reload();
    });
  });
});

