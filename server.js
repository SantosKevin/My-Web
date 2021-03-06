const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/practica2'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/practica2/index.html'));
});

console.log("listening...");