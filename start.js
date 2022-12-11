// let { PythonShell } = require('python-shell')
let express = require('express');
const https = require('https');
const app = express();
let api_key = ''

// serve all public files
app.use(express.static(__dirname + '/public'));




app.get('/search', function (req, res) {

    // get the query from the url
    let query = req.query.s;

    // remove "search from the query
    query = query.replace('"search=', '');

    // remove last character off of query
    query = query.substring(0, query.length - 1);

    console.log(query);

    let firstLetter = query.charAt(0).toLowerCase();
    console.log('https://v2.sg.media-imdb.com/suggestion/' + firstLetter + '/' + query + '.json');

    // make get request with the http library
    let request = https.get('https://v2.sg.media-imdb.com/suggestion/' + firstLetter + '/' + query + '.json', function (response) {
        // data is streamed in chunks from the server -> add the chunks to the data letiable
        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        // finished receiving data
        response.on('end', function () {
            // data has been fully received. parse the JSON string into a JSON object
            console.log("data = " + data);
            try {
                let json = JSON.parse(data);
                // send the data to the browser
                res.send(json);
            }
            catch (e) {

                console.log(e.message);
                switch (e.message) {
                    case 'Unexpected token < in JSON at position 0':
                        res.send('Error Invalid search query');
                        break;
                }
                // res.send("Error " + e)

            }

        });
    });
    // handle errors
    request.on('error', function (e) {
        console.log('Error: ' + e.message);
    });

});





app.get('/result/:name', function (req, res) {

    x = req.params.name;

    // sned everything in /public/result
    res.sendFile(__dirname + '/public/result.html');
});


app.get('/imdb', function (req, res) {

    // get the query from the url
    let query = req.query.id;
    console.log(query);


    // make a get request to the omdb api with the query as a parameter, and the api key 
    // use https
    https.get('https://www.omdbapi.com/?i=' + query + '&apikey=' + api_key, function (response) {
        // data is streamed in chunks from the server -> add the chunks to the data letiable
        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        // finished receiving data
        response.on('end', function () {
            // data has been fully received. parse the JSON string into a JSON object
            console.log("data = " + data);
            try {
                let json = JSON.parse(data);
                // send the data to the browser
                res.send(json);
            }
            catch (e) {

                console.log(e.message);
                switch (e.message) {
                    case 'Unexpected token < in JSON at position 0':
                        res.send('Error Invalid search query');
                        break;
                }
                // res.send("Error " + e)

            };


    });
});





});




app.listen(8089, function () {
    console.log('Started');
});

