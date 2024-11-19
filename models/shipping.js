const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    shippingCity: {
        type: String,
        required: true,
    },
    shippingState: {
        type: String,
        required: true,
    },
    shippingPostalCode: {
        type: String,
        required: true,
    },
    shippingCountry: {
        type: String,
        required: true,
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    shippingCost: {
        type: String,
        required: true,
    },
    shippingStatus: {
        type: String,
        required: true,
    }
}, {timestamps: true });

module.exports = mongoose.model('Shipping', shippingSchema);