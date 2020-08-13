const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 1
    },
    images: {
        type: Array,
        default: []
    },
    continents: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
        //maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    calories: {
        type: Number,
        default: 0
    },
    carb: {
        type: Number,
        default: 0
    },
    fiber: {
        type: Number,
        default: 0
    },
    sugar: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    },
    protein: {
        type: Number,
        default: 0
    },
    allergy: {
        type: String
    },
    sold: {
        type:Number,
        maxlength: 100,
        default: 0
    }
}, { timestamps: true })


productSchema.index({
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }