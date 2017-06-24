var express = require('express');
var bodyParser = require('body-parser');
var pm = require('./processor/ProductManager.js');
var dm = require('./processor/DocumentManager.js');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mime = require('mime');

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

app.get('/uploads/:name', function(req, res){
  var name = req.params.name;
  var file = __dirname + '/uploads/' + name;

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

app.get('/api/products', function (req, res) {
    pm.setApp(app);
    pm.getProducts(res);
});

app.get('/api/product/:pid', function (req, res) {
    var pid = req.params.pid;
    // var data = pm.getProduct(pid, res);
    // res.json(data);
    pm.getProduct(pid, res);
});

app.delete('/api/product/:pid', function (req, res) {
    var pid = req.params.pid;
    // var data = pm.getProduct(pid);
    pm.delProduct(pid, res);
    // res.json(data);
});

app.post('/api/product/:pid', function (req, res) {
    var param = {};
    param.icon = req.body.icon;
    param.number = req.body.number;
    param.numberUnit = req.body.numberUnit;
    param.title = req.body.title;
    param.info = req.body.info;
    param.infoState = req.body.infoState;
    param.pid = req.body.pid;
    param.pictureUpdated = req.body.pictureUpdated;
    pm.updateProduct(param, res);
});

app.post('/api/product', function (req, res) {
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

app.post('/api/document', function(req, res){
    var param = {};
    dm.setApp(app);
    param.content = req.body.content;
    dm.addDocument(param, res);
});

app.get('/api/document/:uuid', function (req, res) {
    var pid = req.params.uuid;
    dm.setApp(app);
    // var data = pm.getProduct(pid, res);
    // res.json(data);
    dm.getDocument(pid, res);
});

app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('My name is Kun');
});

app.post('/upload/:pid', function (req, res) {

    var pid = req.params.pid;
    var filename = "";
    console.log("item id is: " + pid)

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        filename = file.name;
        console.log(filename);
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        // res.send("200:ok");
        pm.updateTempPictureUrl(pid, filename, res);
    });

    // parse the incoming request containing the form data
    form.parse(req);

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