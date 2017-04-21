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

exports.getProducts = function(){
    return mockData;
};

exports.getProduct = function(pid){
    return {
        pid: pid,
        name: "Fish Oil",
        price: 122.3,
        supplier: "XK export",
        desc: "this is world best fish oil",
        weight: "248",
        status: "available",
        PictureUrl: "pic1.jpg"
    }
}