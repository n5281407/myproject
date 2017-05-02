var express = require('express');
var bodyParser = require('body-parser');
var pm = require('./processor/ProductManager.js');
var app = express();

app.set('port', process.env.PORT || 8088);

console.log("current enviroment is: " + app.get('env'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.redirect(303, 'index.html');
});

app.get('/api/products', function (req, res) {
    pm.setApp(app);
    pm.getProducts(res);
});

app.get('/api/product/:pid', function(req, res){
    var pid = req.params.pid;
    var data = pm.getProduct(pid);
    res.json(data);
});

app.delete('/api/product/:pid', function(req, res){
    var pid = req.params.pid;
    // var data = pm.getProduct(pid);
    pm.delProduct(pid, res);
    // res.json(data);
});

app.post('/api/product', function(req, res){
    var param = {};
    param.icon = req.body.icon;
    param.number = req.body.number;
    param.numberUnit = req.body.numberUnit;
    param.title = req.body.title;
    param.info = req.body.info;
    param.infoState = req.body.infoState;
    pm.addProduct(param);
    res.json({
        state: "success"
    });
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
    console.log('Express started at port: ' + app.get('port') + ', press Ctrl - C to terminated');
})