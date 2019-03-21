require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var spotify = require("node-spotify-api");
var fs = require("fs");

var nodeArgs = process.argv;
var command = nodeArgs[2];
var userInput = nodeArgs.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";
switch (command) {

    case "concert-this":
    concert();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    doWhat();
    break;
    
}

function concert(){
    var URL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response) {
        
        var concertData = response.data;
        
        for (i = 0; i < concertData.length; i++){
        // showData ends up being the string containing the show data we will print to the console
       var concertArray = [
        "Venue: " + concertData[i].venue.name,
        "Location: " + concertData[i].venue.country + " " + concertData[i].venue.city,
        "Date: " + concertData[i].datetime
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", concertArray + divider, function(err) {
          if (err) throw err;
          console.log(concertArray);
        });
    }
      });
}

function spotify(){
    var spotify = new Spotify(keys.spotify);
    if (!userInput) {
        userInput = "The Sign";
    }
    spotify.search({ type: 'track', query: "the sign"}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
        //var songInfo = [
         //   d
       // ]
}

function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
      function(response) {
       
        var movieArray = [
            "Title: " + response.data.Title,
            "Year: " + response.data.Year,
            "IMDB Rating: " + response.data.imdbRating,
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
            "Country Where Produced: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors: " + response.data.Actors
            ].join("\n\n");
      
            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", movieArray + divider, function(err) {
              if (err) throw err;
              console.log(movieArray);
            });
      }
    );

}





