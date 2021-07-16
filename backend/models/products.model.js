const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    genericName: {
        type: mongoose.Types.ObjectId,
        ref: 'Generic',
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
    },
}, {
    timestamps: true,
});

productSchema.index({ brandName: 1, genericName: 1}, {unique: true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
