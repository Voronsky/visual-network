var express = require('express');
var app = express();

app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/images',express.static(__dirname+'/images'));
app.use('/css',express.static(__dirname+'/css'));
app.get('/', (req,res)=>{
    // Load the network map
    res.sendFile('./index.html', {root: __dirname});

    if(req.method === 'POST'){

    }
});

app.listen(8080);
