var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    icon: String,
    number: String,
    title: String,
    info: String,
    infoState: String,
    pid: mongoose.Schema.Types.ObjectId
});

productSchema.methods.getDisplayPrice = function(){
    return "$" + this.number;
};

var Product = mongoose.model('Product', productSchema);

module.exports = Product;