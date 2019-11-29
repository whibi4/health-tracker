const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId : String,
    sender : String , //doctor or predection
    message : String , // if prediction by default "Prediction"
    type : String , // in NSVFQ  OR D if doctor
    seen : Boolean
}, {
        timestamps: true
    });

module.exports = mongoose.model('Notification', notificationSchema);