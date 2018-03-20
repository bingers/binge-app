// var happy =[];
// var angry = [];
// var sad = [];
// var dessert = something;
var ageVerification;
// var queryURL = "http://food2fork.com/api/search?key=96b3276309152fafb143690a0f191fa1&q="+dessert+"&count=5";

$(".submit").on("click", function(){
var age = $("#ageVerification").val().trim();

if (13<age<18){
  ageVerification = "&query=pg"
}
else if (age < 13){
  ageVerification = "&query=pg13"
}
var queryURL2 = "https://api.themoviedb.org/3/genre/movie/list?api_key=e5b06f17d05f6cfa0548dce0843cbde4&language=en-US"+ageVerification;
console.log(ageVerification)

$.ajax({
  url: queryURL2,
  method: "GET"
}).then(function (response) {

console.log(response);
});

});