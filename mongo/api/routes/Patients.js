const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Patient = require("../models/Patient");

router.get("/", (req, res, next) => {
  Patient.find()
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
  const patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lastName:  req.body.lastName,
    birthDate:  req.body.birthDate,
    sexe:  req.body.sexe ,
    disease : req.body.disease ,
    weight: req.body.weight,
    height: req.body.height ,
    tel: req.body.tel,
    address: req.body.address,
    photo: req.body.photo
  });
  patient
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /patient",
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

router.get("/:patientId", (req, res, next) => {
  const id = req.params.patientId;
  Patient.findById(id)
    .exec()
    .then(doc => {
      console.log(doc.createdAt)
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

router.patch("/:patientId", (req, res, next) => {
  console.log(req.body)
  const id = req.params.patientId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[Object.keys(ops)[0]] = ops[Object.keys(ops)[0]];
    console.log(Object.keys(ops)[0])
  }

  Patient.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(updateOps);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:patientId", (req, res, next) => {
  const id = req.params.patientId;
  Patient.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;