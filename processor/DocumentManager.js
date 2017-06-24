var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var opts = {
    server: {
        socketOptions: { keepAlive: 1}
    }
};

var Document = require('../models/Document.js');
var myApp;

exports.setApp = function (app){
    myApp = app;
};
exports.addDocument = function(param, res){
    var uuid = uuidv4();
    switch (myApp.get('env')) {
        case 'development':
            mongoose.connect("mongodb://localhost:27017/test", opts);
            break;
        case 'production':
            mongoose.connect("mongodb://localhost:27017/test", opts);
            break;
        default:
            throw new Error('Unknown execution environment: ' + myApp.get('env'));
    }    
    new Document(
        {
            uuid: uuid,
            content: param.content,
            timestamp: Date.now()
        }
    ).save(function(err, product){
        mongoose.connection.close();
        if(err){
            throw new Error("internal error");
        }else{
            console.log("new document added, uuid: " + uuid);
            res.json({
                state: "success",
                uuid: uuid
            });        
        }
    })
};

exports.getDocument = function(uuid, res){
    switch (myApp.get('env')) {
        case 'development':
            mongoose.connect("mongodb://localhost:27017/test", opts);
            break;
        case 'production':
            mongoose.connect("mongodb://localhost:27017/test", opts);
            break;
        default:
            throw new Error('Unknown execution environment: ' + myApp.get('env'));
    }
    Document.findOne({
        uuid: uuid
    }, function(err, doc){
        mongoose.connection.close();
        if(err){
            throw new Error("internal error");
        }else{
            var data = {
                content: doc.content,
                uuid: doc.uuid,
                timestamp: doc.timestamp
            }
            var text = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Document Sharing</title>
                    </head>
                    <body>
                        <p>${data.content}</p>
                    </body>
                </html>
            `;
            res.send(text);
        }
    })
};