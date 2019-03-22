require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var command = nodeArgs[2];
var userInput = nodeArgs.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";
switch (command) {

    case "concert-this":
    concert();
    break;

    case "spotify-this-song":
    spotifySong();
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
      
       var concertArray = [
        "Venue: " + concertData[i].venue.name,
        "Location: " + concertData[i].venue.country + " " + concertData[i].venue.city,
        "Date: " + concertData[i].datetime
        ].join("\n\n");
  
        // append concertData and the divider to log.txt console log concertArray
        fs.appendFile("log.txt", concertArray + divider, function(err) {
          if (err) throw err;
          console.log(concertArray);
        });
    }
      });
}

function spotifySong(){
    
    if (!userInput) {
        userInput = "The Sign";
    }
    spotify.search({ type: 'track', query: userInput}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      var songInfo = data.tracks.items;
      
      var songArray = [
	        "Artist(s): " + songInfo[0].artists[0].name,
	        "Song Name: " + songInfo[0].name,
	        "Preview Link: " + (src = songInfo[0].preview_url),
          "Album: " + songInfo[0].album.name
      ].join("\n\n");
  
      // append songArray and the divider to log.txt, console log songArray
      fs.appendFile("log.txt", songArray + divider, function(err) {
        if (err) throw err;
        console.log(songArray);
      });
      });


        
}

function movie() {
    if (!userInput) {
    userInput = "Mr. Nobody";
    }
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
      
            // append movieArray and the divider to log.txt, console log movieArray
            fs.appendFile("log.txt", movieArray + divider, function(err) {
              if (err) throw err;
              console.log(movieArray);
            });
      }
    );

}

function doWhat () {
  fs.readFile('random.txt', "utf8", (err, data) => {
    if (err) throw err;

    var textArray = data.split(',');
    userInput= textArray[1];
  
    spotifySong(userInput);
  });
  
  
}





