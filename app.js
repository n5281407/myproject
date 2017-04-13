var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8088);

app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Hello there and welcome');
});

app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('My name is Kun');
});

//定制404页面
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - server error');
});

app.listen(app.get('port'), function(){
    console.log('Express started, press Ctrl - C to terminated');
})