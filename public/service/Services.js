jQuery.sap.declare("xsoft.service.Services");

xsoft.service.Services = [
    {
        service: "xsoft.service.getAllProducts",
        url: "/api/products",
        action: "GET",
        expect: "json"
    },
    {
        service: "xsoft.service.getProduct",
        url: "/api/product/{pid}",
        action: "GET",
        expect: "json"
    }    
];
