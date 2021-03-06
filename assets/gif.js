var cities = ["Boston", "Atlanta", "New York City", "Dallas", "San Francisco", "Portland", "Denver", "Tucson", "San Deigo", "Salt Lake City"];

function displayCityInfo() {
  console.log("displayCityInfo function fired")
  var topics = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=jmK425SJmaJpbztNlcahxnRv3NkyE1cG&limit=5";





  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // $("cities-view").empty();
    console.log(response);

    var results = response.data;

    // loops the cities for a limit of 10
    for (var i = 0; i < results.length; i++) {
      var citiesDiv = $("<div>");

      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      citiesDiv.append(p)

      var imgUrl = results[i].images.fixed_width.url;
      var stillUrl  = results[i].images.fixed_width_still.url;

      var cityImages = $("<img>").attr("src", imgUrl);
      cityImages.attr("src", stillUrl);
      cityImages.attr("data-still", stillUrl);
      cityImages.attr("data-animate", imgUrl);
      cityImages.attr("data-state", "still");
      cityImages.attr("class", "gifs");


      citiesDiv.append(cityImages);

      $("#gif-view").prepend(citiesDiv);
    }




  });

};



// Function for displaying movie data
function renderButtons() {

  // Deleting the city buttons prior to adding new city buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#cities-view").empty();

  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each city in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("city");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", cities[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(cities[i]);
    // Adding the button to the HTML
    $("#cities-view").append(a);
  }
};

// This function handles events where one button is clicked
$("#add-city").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var topics = $("#city-input").val().trim();
  // The movie from the textbox is then added to our array
  cities.push(topics);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});



$(document).on("click", ".gifs", function(){
    var state = $(this).attr("data-state");
  
    if (state === "still"){
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else{
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

    $(document).on("click", ".city", displayCityInfo);{};





// // Calling the renderButtons function at least once to display the initial list of cities
renderButtons();
