const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios')


const Http = require("http").Server(express);
const Socketio = require("socket.io")(Http);
Http.listen(4000);



const Data = require("../models/Data");

router.get("/", (req, res, next) => {
  Data.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      
      res.status(500).json({
        error: err
      });
    });
});
/*
router.post("/", (req, res, next) => {
 const data = new Data({
   _id: new mongoose.Types.ObjectId(),
   patientId : req.body.patientId,
   accel: {
     accelX: req.body.accel.accelX,
     accelY: req.body.accel.accelY,
     accelZ: req.body.accel.accelZ
 },
 temp: req.body.temp,
 gyro: {
     gyroX: req.body.gyro.gyroX,
     gyroY: req.body.gyro.gyroY,
     gyroZ: req.body.gyro.gyroZ
 },
 ecg:req.body.ecg,
 rsltAi : req.body.rsltAi
 });
 data
   .save()
   .then(result => {
     console.log(result);

     //send a websocket 
     Socketio.emit('track',result)

     
     res.status(201).json({
       message: "Handling POST requests to /data",
       patient: result
     });
   })
   .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
});
*/

router.post("/", (req, res, next) => {
  axios.post('http://192.168.137.177:12345/predict' , {
    ecg: req.body.ecg
  })
    .then((respai) => {
      const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        patientId: '12345',
        accel: {
          accelX: req.body.accel.accelX,
          accelY: req.body.accel.accelY,
          accelZ: req.body.accel.accelZ
        },
        temp: req.body.temp,
        gyro: {
          gyroX: req.body.gyro.gyroX,
          gyroY: req.body.gyro.gyroY,
          gyroZ: req.body.gyro.gyroZ
        },
        ecg: req.body.ecg,
        rsltAi: respai.data.rs
      });
      data
        .save()
        .then(result => {
          console.log(result)
    
          //send a websocket 
          Socketio.emit('track', result)
          
          res.status(201).json({
            message: "Handling POST requests to /data",
            patient: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch((error) => {

      
    })
  
});

router.get("/:patientId", (req, res, next) => {
  const patientid = req.params.patientId;
  Data.find({ patientId: patientid })
    .exec()
    .then(doc => {
      
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      
      res.status(500).json({ error: err });
    });
});


module.exports = router;