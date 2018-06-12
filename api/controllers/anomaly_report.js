const mongoose = require("mongoose");
const aReport = require('../models/anomaly_report');
const ARlist = require('../models/arList');
const AReport = require('../models/anomaly_report');

exports.save_ar = (req, res, next) => {
  // const gamesOnDate = req.params.gamesDate;
  ARlist.find()
    .select()
    .exec()
    .then(result => {
      return result[result.length-1]; //find from arr list

    })
    .then(data => {
      //parse arNum
      const arNum = data.arNum;

      // grab and save form data


      res.status(200).json({
        arNum: data.arNum
      })
    })
    .catch(err => {
      console.log("can't find any AR");
      res.status(404).json({
        error: err
      })
    })
};

exports.delete_ar = (req,res,err) => {
  ARlist.remove({_id: req.params.arID})
    .exec()
    .then(result => {
      res.status(200).json({
        message: `AR deleted`,
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

exports.get_all_ar = (req,res,next) => {
  ARlist.find()
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log("Can't find the ARs")
      res.status(404).json({
        error: err
      })
    })
}

exports.post_ar = (req, res, next) => {
  const newAR = new ARlist({
    _id: new mongoose.Types.ObjectId(),
    arNum: 3333,
    random : "abc"
  });

  newAR
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Creating a new AR", //generic blah
        createdAR_number: result.list
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};