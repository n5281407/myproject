var express = require('express');
var pm = require('./processor/ProductManager.js');
var app = express();

app.set('port', process.env.PORT || 8088);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('Hello there and welcome');
    res.redirect(303, 'index.html');
});

app.get('/api/products', function (req, res) {
    var data = pm.getProducts();
    res.json(data);
});

app.get('/api/product/:pid', function(req, res){
    var pid = req.params.pid;
    var data = pm.getProduct(pid);
    res.json(data);
});

app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('My name is Kun');
});

//定制404页面
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//定制500页面
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - server error');
});

app.listen(app.get('port'), function () {
    console.log('Express started, press Ctrl - C to terminated');
})