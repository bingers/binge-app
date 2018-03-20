  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyATqoaVNAv5dim_qlP4AAgVe3CMGZLNF9Y",
    authDomain: "binge-web-app.firebaseapp.com",
    databaseURL: "https://binge-web-app.firebaseio.com",
    projectId: "binge-web-app",
    storageBucket: "",
    messagingSenderId: "979328161042"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




 //$("#submit").on("click", function (event) {
   // event.preventDefault();
    //var foodSearch = $("#food-input").val().trim();

   // var foodSearch = "bacon";
    //var queryURL = "http://food2fork.com/api/search?key=96b3276309152fafb143690a0f191fa1&q=" + foodSearch + "&sort=r";
    var queryURL = "http://food2fork.com/api/search?key=96b3276309152fafb143690a0f191fa1&q=dessert&sort=r&count=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var data = JSON.parse(response);
      var recipeCount = data.count;
      console.log("count: " + recipeCount);
      var i = 0;

      var a = $("<div>");
      a.text(data.recipes[i].title);
      var b = $("<div>");
      var bImg = $("<img>");
      bImg.attr("src", data.recipes[i].image_url);
      b.append(bImg);
      var c = $("<div>");
      c.text(data.recipes[i].source_url);
      var d = $("<div>");
      d.text(data.recipes[i].social_rank);

      $("body").append(a, b, c, d);
    });

 // });

   // callback for successful getConfiguration call
   function configSuccessCallback(data) {
    'use strict';
    // Set the base image url to the returned base_url value plus w185, shows posters with a width of 185 pixels.
    // Store it in localStorage so we don't make the configuration call every time.
    localStorage.setItem('tmdbImageUrlBase', JSON.parse(data).images.base_url + 'w185');
    $('#results').text('tmdbImageUrlBase downloaded from themoviedb.org: ' + localStorage.getItem(
        'tmdbImageUrlBase'));
}
// callback for getConfiguration call error
function configErrorCallback(data) {
    'use strict';
    $('#results').text('Error getting TMDb configuration! ' + JSON.parse(data).status_message);
}
// check localStorage for imageBaseUrl, download from TMDb if not found
if (localStorage.getItem('tmdbImageUrlBase')) {
    $('#results').text('tmdbImageUrlBase retrieved from localstorage: ' + localStorage.getItem(
        'tmdbImageUrlBase'));
} else {
    theMovieDb.configurations.getConfiguration(configSuccessCallback, configErrorCallback);
}

// callback for successful movie search
function successCallback(data) {
    'use strict';
    $('#results').text('');
    data = JSON.parse(data);
    //console.log(data);
    // we just take the first result and display it
    if (data.results && data.results.length > 0) {
        var imageUrl = localStorage.getItem('tmdbImageUrlBase') + data.results[0].poster_path;
        $('#results').append('Title: <b>' + data.results[0].title + '</b><br />');
        $('#results').append('Movie Id: ' + data.results[0].id + '<br />');
        $('#results').append('<img src="' + imageUrl + '" />');
    } else {
        $('#results').text('Nothing found');
        console.log('Nothing found');
    }
}
// callback for movie search error
function errorCallback(data) {
    'use strict';
    //console.log('error: \n' + data);
    $('#results').text('Error searching. ' + JSON.parse(data).status_message);
}

// search button click event handler
$('#searchButton').click(function () {
    'use strict';
    var searchTerm = $('#movieNameInput').val(),
        searchYear = $('#movieYearInput').val(),
        options = {
            "query": searchTerm
        };
    //options.query = searchTerm;
    if (!isNaN(searchYear)) {
        options.year = searchYear;
    }
    theMovieDb.search.getMovie(options, successCallback, errorCallback);
});


