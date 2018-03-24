var foodData;
var i = 0;
var activeFood;
$("#food-last").hide();
$("#food-next").hide();


  $('.emoji').tooltip('toggleEnabled');

$('.emoji').on('click', function () {
    $(this).button('toggle');
    var clickedFoodEmoji = $("#food-emojis").find(".active");
    console.log(clickedFoodEmoji.children("input").val() );

});


$("#FinalSubmit").on("click", function (event) {
    event.preventDefault();

    var activeFoodObject = $("#food-emojis").find(".active");
    var foodValue = activeFoodObject.children("input").val();
    console.log(foodValue);
   
   // var foodSearch = activeFood;
   // console.log(foodSearch);

    //var foodSearch = $("#food-input").val().trim();
    var foodSearch = foodValue;
    var queryURL = "http://food2fork.com/api/search?key=96b3276309152fafb143690a0f191fa1&q=" + foodSearch + "&sort=r&count=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#food-results").empty();
        foodData = JSON.parse(response);
        console.log("count: " + foodData.count);
        displayFood();

    });
    $("#food-emojis").hide();
    $("#food-next").show();
});


$("#food-next").on("click", function () {
    i++;
    if (i > 0) {
        $("#food-last").show()
    };
    if (i === 4) {
        $("#food-next").hide();
    }
    displayFood();
});


$("#food-last").on("click", function () {
    i--;
    $("#food-next").show();
    if (i === 0) {
        $("#food-last").hide();
    }
    displayFood();
});

function displayFood(){
    $("#food-results").empty();
    var foodTitle = $("<h3>");
    foodTitle.text(foodData.recipes[i].title);
    var foodImgDiv = $("<div>");
    var foodImg = $("<img class='img-fluid'>");
    foodImg.attr("src", foodData.recipes[i].image_url);
    foodImgDiv.append(foodImg);
    var foodLinkDiv = $("<div>");
    var foodLink = $("<a target='_blank' href='" + foodData.recipes[i].source_url + "'>Go to the recipe!</a>");
    foodLinkDiv.append(foodLink);
    var foodRating = $("<div>");
    foodRating.text("Rank: " + foodData.recipes[i].social_rank);
    $("#food-results").append(foodTitle, foodImgDiv, foodLinkDiv, foodRating);

};



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
