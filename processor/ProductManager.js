var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
var myApp;
var Product = require('../models/Product.js');

var mockData = [
    {
        "icon": "sap-icon://hint",
        "type": "Monitor",
        "title": "Tiles: a modern UI design pattern for overview & navigation.",
        "pid": "1"
    },
    {
        "icon": "sap-icon://inbox",
        "number": "89",
        "title": "Approve Leave Requests",
        "info": "Overdue",
        "infoState": "Error",
        "pid": 2
    },
    {
        "type": "Create",
        "title": "Create Leave Requests",
        "info": "28 Days Left",
        "infoState": "Success",
        "pid": "3"
    },
    {
        "icon": "sap-icon://travel-expense-report",
        "number": "281",
        "numberUnit": "euro",
        "title": "Travel Reimbursement",
        "info": "1 day ago",
        "pid": "4"
    },
    {
        "icon": "sap-icon://loan",
        "number": "2380",
        "numberUnit": "euro",
        "title": "My Salary",
        "info": "8 days ago",
        "pid": "5"
    },
    {
        "icon": "sap-icon://lab",
        "number": "1",
        "numberUnit": "Invention",
        "title": "Test Lab Reports",
        "info": "8 Days Ago",
        "pid": "6"
    },
    {
        "icon": "sap-icon://inbox",
        "type": "Monitor",
        "title": "Leave Request History",
        "pid": "7"
    },
    {
        "type": "Create",
        "title": "Create Purchase Order",
        "info": "890€ Open Budget",
        "infoState": "Success",
        "pid": "8"
    },
    {
        "icon": "sap-icon://stethoscope",
        "number": "3",
        "title": "Yearly Health Check",
        "info": "3 year overdue",
        "infoState": "Error",
        "pid": "9"
    },
    {
        "icon": "sap-icon://meal",
        "type": "Monitor",
        "title": "Meal Schedule",
        "pid": "10"
    },
    {
        "icon": "sap-icon://cart",
        "number": "787",
        "numberUnit": "euro",
        "title": "My Shopping Carts",
        "info": "Waiting for Approval",
        "infoState": "Warning",
        "pid": "11"
    },
    {
        "icon": "sap-icon://factory",
        "number": "2",
        "numberUnit": "Outages",
        "title": "Factory Power Management",
        "info": "Production On Hold",
        "infoState": "Error",
        "pid": "12"
    },
    {
        "icon": "sap-icon://calendar",
        "title": "Team Calendar",
        "pid": "13"
    },
    {
        "icon": "sap-icon://pie-chart",
        "number": "5",
        "title": "Financial Reports",
        "info": "4 day ago",
        "infoState": "Warning",
        "pid": "14"
    }
];

exports.setApp = function (app) {
    myApp = app;
};

exports.addProduct = function (param) {
    new Product(
        {
            icon: param.icon,
            number: param.number,
            numberUnit: param.numberUnit,
            title: param.title,
            info: param.info,
            infoState: param.infoState
        }
    ).save(function (err, product) {
        if (err) {
            throw new Error("internal error");
        } else {
            console.log("new item added");
        }
    });
};

exports.updateProduct = function (param, res) {
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
                console.log("xxx: " + param.pid);
    Product.findById(param.pid, function(err, product){
        if(err){
            //todo: error handling
        }else{
            product.icon = param.icon;
            product.title = param.title;
            product.info = param.info;
            product.number = param.number;
            product.numberUnit = param.numberUnit;
            product.infoState = param.infoState;
            product.save(function(err, updatedProduct){
                mongoose.connection.close();
                console.log(product.pid + " updated.");
                res.json({message: product.pid + " updated."});
            });
        }
    });
};

exports.getProducts = function (res) {
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
    Product.find(function (err, products) {
        if (err) {
            console.error(err);
        } else {
            if (products.length) {
                console.log(products.length + " items found.");
                convertProducts = products.map(function (item) {
                    var val = {
                        pid: item.id,
                        icon: item.icon,
                        title: item.title,
                        info: item.info,
                        number: item.number,
                        numberUnit: item.numberUnit,
                        infoState: item.infoState
                    }
                    console.log("val: " + val.pid);
                    return val;
                });
            } else {
                console.error("no item found");
            }

        }
        mongoose.connection.close();
        console.log('new array length: ' + convertProducts.length);
        for (var i = 0; i < convertProducts.length; i++) {
            console.log(convertProducts[i]);
        }
        res.json(convertProducts);
    });
};

exports.getProduct = function (pid, res) {
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
    Product.findById(pid, function (err, product) {
        console.log(product);
        mongoose.connection.close();
        var s = "";
        if (product.infoState == "Success") {
            s = "S";
        } else if (product.infoState == "Warning") {
            s = "W";
        } else {
            s = "E";
        }
        var data = {
            pid: pid,
            Name: pid,
            Price: product.number,
            Unit: product.numberUnit,
            info: product.info,
            status: s,
            PictureUrl: "pic1.jpg",
            title: product.title,
            icon: product.icon,
        }
        res.json(data);
    });
};

exports.delProduct = function (pid, res) {
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
    console.log("request delete item: " + pid);
    Product.findByIdAndRemove(pid, function (err, doc) {
        console.log(doc);
        mongoose.connection.close();
        var response = {
            message: "item: " + pid + "successfully deleted",
        };
        res.json(response);
    });
}