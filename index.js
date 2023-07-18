const express = require('express'); //This is the library we use for the http requests
const app = express(); //This manages the http requests
const http = require('http').Server(app); //Manages the http server, dont worry about this, this is just so node listens to a port
const session = require('express-session'); //This is used to manage the current user, so lets say the user reloads the page and is logged in the server knows who is who

http.listen(5000, '127.0.0.1', function () { //Connect the server to localhost (127.0.0.1) on port 5000
    console.log('listening on 127.0.0.1:5000'); //Print a little message in the console that it is working
});

//Next we need to tell the server to use session
app.use(session({ 
    secret: 'secret', //Encrypted session
    resave: true, //Refresh it once in a while
    saveUninitialized: true //No idea what it does, but I always add it since it works
}));

app.use(express.json()); //Tell session to use json format
app.use('/', express.static(__dirname + '/client/')) //Tell the server to share the client folder fully with the client

app.get("/", async (req, res) => { //req == request (aka what the client is sending to the server), res == what the server sends to the client.
    res.sendFile(__dirname + '/client/index.html'); //When connecting to the server the server will send the index.html file to the client
});

//From here on we will do some post requests, see the code below. Overall you will see it is in /api, this is just convention.
app.post('/api/button_click', async (req, res) => {
    const { type, data } = req.body; //When making a request to access the info of the client we can get it with the .body (which is the body of the json). See the index.html js code for the json layout. Here the data in the json is just stored as values type and data
    console.log(type, data, "happy days")
    return res.json({ status: 'ok' }); //Respond to the client with the data status. Here we can also add in case a failure occurs (see code below):
    // return res.json({ status: 'ok', error: 'failed to handle' }); 
});