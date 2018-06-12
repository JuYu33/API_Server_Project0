//define how products should look

const mongoose = require('mongoose');

const anomalyReport = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  arNumber: { type: String},
  type: { type: Number},
  projNumber: {type: Number},
  customer: {type: String},
  processOwner: {type: String},
  assembly: {type: String},
  partNumber: {type: String},
  serialNumber: {type: String},
  engApprov: {type: String},
  qa: {type: String},
  date: {type: Date},
  problem: {type: String},
  ecd: {type: Date},
  severity: {type: Number},
  immCorrAct: {type: String},
  rootCause: {type: String},
  rootCauseCorr: {type: String},
  prevAct: {type: String},
  devImpact: {type: String},
  desImpact: {type: String},
  qaImpact: {type: String},
  observation: {type: String},
  attribution: {type: String},
  explanation: {type: String},
  auditor: {type: String},
  dateSent: {type: Date},
  customerFail: {type: String}
});

module.exports = mongoose.model('AReport', anomalyReport);