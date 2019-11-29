const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Notification = require("../models/Notification");

router.get("/", (req, res, next) => {
  Notification.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const notification = new Notification({
    _id: new mongoose.Types.ObjectId(),
    patientId : req.body.patientId,
    sender : req.body.sender , //doctor or predection
    message : req.body.message , // if prediction by default "Prediction"
    type : req.body.type , // in NSVFQ  OR D if doctor
    seen : req.body.seen
  });
  notification
    .save()
    .then(result => {
      console.log(result);

      
      res.status(201).json({
        message: "Handling POST requests to /notification",
        notification: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:patientId", (req, res, next) => {
  const patientid = req.params.patientId;
  Notification.find({ patientId: patientid })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:patientId/:seen", (req, res, next) => {
  const seen = req.params.seen ;
  const patientid = req.params.patientId;
  Notification.find({ patientId: patientid , seen: seen  })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;