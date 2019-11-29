const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    lastName: String,
    birthDate: Date,
    sexe: String,
    disease: String,
    weight: Number,
    height: Number ,
    tel: String,
    address: String,
    photo: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Patient', productSchema);