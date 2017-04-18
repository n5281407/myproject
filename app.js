var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8088);

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    // res.type('text/plain');
    // res.send('Hello there and welcome');
    res.redirect(303, 'index.html');
});

app.get('/api/products', function(req, res){
    res.json([
                    {
                        "icon" : "sap-icon://hint",
                        "type" : "Monitor",
                        "title" : "Tiles: a modern UI design pattern for overview & navigation."
                    },
                    {
                        "icon" : "sap-icon://inbox",
                        "number" : "89",
                        "title" : "Approve Leave Requests",
                        "info" : "Overdue",
                        "infoState" : "Error"
                    },
                    {
                        "type" : "Create",
                        "title" : "Create Leave Requests",
                        "info" : "28 Days Left",
                        "infoState" : "Success"
                    },
                    {
                        "icon" : "sap-icon://travel-expense-report",
                        "number" : "281",
                        "numberUnit" : "euro",
                        "title" : "Travel Reimbursement",
                        "info" : "1 day ago"
                    },
                    {
                        "icon" : "sap-icon://loan",
                        "number" : "2380",
                        "numberUnit" : "euro",
                        "title" : "My Salary",
                        "info" : "8 days ago"
                    },
                    {
                        "icon" : "sap-icon://lab",
                        "number" : "1",
                        "numberUnit" : "Invention",
                        "title" : "Test Lab Reports",
                        "info" : "8 Days Ago"
                    },
                    {
                        "icon" : "sap-icon://inbox",
                        "type" : "Monitor",
                        "title" : "Leave Request History"
                    },
                    {
                        "type" : "Create",
                        "title" : "Create Purchase Order",
                        "info" : "890€ Open Budget",
                        "infoState" : "Success"
                    },
                    {
                        "icon" : "sap-icon://stethoscope",
                        "number" : "3",
                        "title" : "Yearly Health Check",
                        "info" : "3 year overdue",
                        "infoState" : "Error"
                    },
                    {
                        "icon" : "sap-icon://meal",
                        "type" : "Monitor",
                        "title" : "Meal Schedule"
                    },
                    {
                        "icon" : "sap-icon://cart",
                        "number" : "787",
                        "numberUnit" : "euro",
                        "title" : "My Shopping Carts",
                        "info" : "Waiting for Approval",
                        "infoState" : "Warning"
                    },
                    {
                        "icon" : "sap-icon://factory",
                        "number" : "2",
                        "numberUnit" : "Outages",
                        "title" : "Factory Power Management",
                        "info" : "Production On Hold",
                        "infoState" : "Error"
                    },
                    {
                        "icon" : "sap-icon://calendar",
                        "title" : "Team Calendar"
                    },
                    {
                        "icon" : "sap-icon://pie-chart",
                        "number" : "5",
                        "title" : "Financial Reports",
                        "info" : "4 day ago",
                        "infoState" : "Warning"
                    }
    ]);
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