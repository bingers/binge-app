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
