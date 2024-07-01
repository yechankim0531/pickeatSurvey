const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
    });

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/home.html');
        });    

app.listen(8080, () => {
    console.log(`Server is listening`);
});    