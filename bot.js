const TWIT = require('twit')
const config = require('./config');

var Twit = new TWIT(config);

function makeTweet(tweet) {
    Twit.post('statuses/update', { status: tweet }, function(err, data, response) {
        if(err) {
            console.log(err)
        } else {
            console.log("Tweet Made Successfully")
        }
    });
};

function trackTweet(keyword) {
    let stream = Twit.stream('statuses/filter', {track: keyword})
    stream.on('tweet', function (tweet) {
        console.log(tweet.user.screen_name, 'tweeted', tweet.text);
        favoriteTweet(tweet.id_str)
    });
}

function favoriteTweet(tweet_id) {
    Twit.post('favorites/create', {id: tweet_id}, function(err, data, response) {
        if (err) {
            console.log("Couldn't favorite tweet");
        } else {
            console.log('Successfully favorited Tweet!');
        }
    });
}

function followUser(username) {
    Twit.post('friendships/create', {screen_name: username}, function(err, data, response) {
        if (err) {
            console.log("Couldn't Follow!");
        } else {
            console.log('Followed!', tweet.user.screen_name);
        }
    });    
}

trackTweet('nepal');
// setInterval(makeTweet, 60 * 1000, Math.random() * 20)