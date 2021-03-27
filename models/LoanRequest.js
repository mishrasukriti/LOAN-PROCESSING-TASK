const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const loanRequestsSchema = new mongoose.Schema({
  loanRequestId: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  userEmailId: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  assignedCRMEmailId: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  currentStatus: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  loanAmount: {
    type: SchemaTypes.Long,
    required: true,
    max: 1024,
    min: 4  ,
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
  lastUpdatedTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("LoanRequests", loanRequestsSchema);
