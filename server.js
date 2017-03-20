var express = require('express');

var app = module.exports = express();

app.use(express.static(__dirname));

app.listen(9999);

app.get('/', function(req, res){
    res.redirect('/views/game.html');
});