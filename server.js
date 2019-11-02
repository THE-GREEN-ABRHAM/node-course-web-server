/***
    ===========================================================
    ===========================================================
    We are going to use express to build an Web-App-Development
    ===========================================================
    ===========================================================
 */

//first we need to create a package.json using command npm init
//require express
const express = require("express");
const fs = require('fs');
const hbs = require('hbs');
//create an express app

var app = express();

app.set('view engine', 'hbs');


/*****
 * ============================================================
 * ============================================================
 *       Express-Middleware
 * ============================================================
 * ============================================================
 * 
 */

//we use middleware 'app.use' for register takes functions
//basic middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(now + ": req " + req.url);
    fs.appendFileSync('server_log.txt', now + `method ${req.method} url ${req.url}` + '\n')
    next();
});


//personal challenge

app.use((req, res, next) => {
    res.render('maintainance');
});

//we can access public files
//which is found in the public folder can be access through localhost:3000/index.html(help.html) 
app.use(express.static(__dirname + '/public'));












//start our app
//using GET method

app.get('/', (req, res) => {
    res.send("<H1 >Hello Express</H1>");
    console.log("Hello Express");

});
app.get('/server_log', (req, res) => {

    //other route
    var txt = fs.readFileSync("server_log.txt");
    res.send("" + txt);
});
app.get('/bad', (req, res) => {
    res.send("<h1 style=\"t;text-align:center;color:red;\">404 Not Found</h1>");
});

//how  to return json file

app.get('/api', (req, res) => {
    //send json
    res.send({
        name: "abrham",
        error: [
            "NO_INTERNET",
            "NO_ACESSS",
            "NO_MOVE",
            "NO_LINK"
        ]
    });
});



//listen app on port 3000
app.listen(3000);