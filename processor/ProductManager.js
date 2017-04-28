var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
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
        "pid": "2"
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

exports.setApp = function(app){
    myApp = app;
}

exports.getProducts = function(){
    switch(myApp.get('env')){
        case 'development':
            mongoose.connect('mongodb://localhost:27017/test',opts);
            break;
        case 'production':
            mongoose.connect('mongodb://localhost:27017/test',opts);
            break;
        default:
            throw new Error('Unknown execution environment: ' + app.get('env'));
    }; 
    var db = mongoose.connection;
    db.on('error', function(){
        console.error('connection failed');
    });
    db.once('open', function() {
    // we're connected!
        console.info('connection successed');
        Product.find(function(err, products){
            if(err){
                console.error(err);
            }else{
                if(products.length){
                    console.log(products.length + " items found.");
                }else{
                    console.error("no item found");
                }
                mongoose.connection.close();
            }
        });        
    }); 

    return mockData;
};

exports.getProduct = function(pid){
    return {
        pid: pid,
        Name: "Fish Oil",
        Price: 122.3,
        SupplierName: "XK export",
        ShortDescription: "this is world best fish oil",
        Weight: "248",
        status: "A",
        PictureUrl: "pic1.jpg"
    }
}