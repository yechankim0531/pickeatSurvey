const express = require('express');
const path = require('path');
const app = express();
const {fetchQuestions} = require("./DB.js")

app.use(express.static(path.join(__dirname))); // Serve static files from the 'src' directory

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,  'home.html')); // Correct path concatenation
});

app.get('/api/data/questions', async(req,res)=>{
    try{
        const questions = await fetchQuestions();
        //console.log(questions)
        res.send(questions)
        

    }
    catch(err){
        res.status(500).send('Error fetching quest');

    }
})

app.get('/question', function(req, res){
    res.sendFile(path.join(__dirname, 'question.html')); // Serve question.html for the /question route
});

app.get('/user', function(req, res){
    res.sendFile(path.join(__dirname, 'user.html')); // Serve user.html for the /user route
});

app.get('/end', function(req, res){
    res.sendFile(path.join(__dirname,  'end.html')); // Serve user.html for the /user route
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});




