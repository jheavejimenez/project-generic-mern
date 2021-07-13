const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    genericName: {
        type: mongoose.Types.ObjectId,
        ref: 'Generic'
    },
    brandName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    dosage: {
        type: String,
    },

}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
