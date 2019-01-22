var dotenv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");


var arg2 = process.argv[2];
var searchInput = "";


function searchSpotify(search) {

    if (searchInput == "") {
        searchInput = "The Sign Ace of Base";
    }

    let spotify = new Spotify(keys.spotify);

    spotify.search({
        type: "track",
        query: search,
        limit: 2
    }, function (err, response) {

        fs.appendFile("log.txt", "Spotify Log Entry Start Processed on:" + Date() + "Terminal commands:" + process.argv);

        let songResp = response.tracks.items;

        for (var i = 0; i < songResp.length; i++) {
            console.log("Spotify searchInputResult");
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));
            console.log(("Preview link: " + songResp[i].preview_url));
            console.log("End of searchInputResult");
            // didnt know what to console log so I used a refrence
            fs.appendFile("Result " + "Artist: " + songResp[i].artists[0].name + "Song title: " + songResp[i].name + "Album name: " + songResp[i].album.name + "URL Preview: " + songResp[i].preview_url);
        }
        fs.appendFile("log.txt", "Spotify Log Entry End");
    })
};



function searchConcert(search) {
    let bands = keys.bands;

    if (searchInput == "") {
        searchInput = "ColdPlay";
    }

    let queryUrl = "https://rest.bandsintown.com/artists/" + search.trim() + "/events?app_id=" + bands + "&date=upcoming";

    request(queryUrl, function (err, response, body) {

        fs.appendFile("log.txt", "searchConcert Log Entry Start Processed on: \n" + Date() + "" + "Terminal commands:\n" + process.argv + "");

        if (JSON.parse(body).Error == "No upcoming searchConcerts for " + search) {

            console.log("\nNo results found for " + searchInput + ". Please try another artist.")

            fs.appendFile("log.txt", "No results found for " + searchInput + ". Please try another artist.searchConcert Log Entry End");

        } else {
            console.log("Artist Name: " + search);
            console.log("Venue Name: " + searchConcertBody[0].venue.name);
            fs.appendFile("log.txt", "Artist Name: " + searchInput + "Venue Name: " + searchConcertBody[0].venue.name + "Venue Location: " + searchConcertBody[0].venue.city + ", " + concertBody[0].venue + "Concert Log Entry End");

        };
    });
};

function randomSearch() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        var randomArray = data.split(",");

        if (randomArray[0] == "Spotify-song-search") {
            searchSpotify(randomArray[1]);
        } else if (randomArray[0] == "movie-this") {
            searchMovie(randomArray[1]);
        }
    });
};
for (var i = 3; i < process.argv.length; i++) {
    searchInput += process.argv[i] + "";
};

if (arg2 = "Spotify-song-search") {
    searchSpotify(search)
} else if (arg2 = "searchConcert-this") {
    searchConcert(search)
} else if (arg2 = "movie-this") {
    searchmovie(search)
} else if (arg2 = "do-what-it-says") {
    randomSearch(search)
} else if (arg2 = "") {
    console.log("You entered an invalid command. Please try one of the following commands");
};