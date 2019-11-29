const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId : String,
    accel: {
        accelX: Number,
        accelY: Number,
        accelZ: Number
    },
    temp: Number,
    gyro: {
        gyroX: Number,
        gyroY: Number,
        gyroZ: Number
    },
    ecg:Array ,
    rsltAi : String 
}, {
        timestamps: true
    });

module.exports = mongoose.model('Data', dataSchema);