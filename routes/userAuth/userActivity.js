// This file containts API implementation for various user related activities. For example: Applying Loan, Checking loan status etc.

path = require('path')
bodyParser = require('body-parser');

const router = require("express").Router();
const {v4 : uuidv4} = require('uuid')
const verify = require("./userVerfiy");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");
const LoanRequest = require('../../models/LoanRequest');
const User = require('../../models/User');
const LoanRequestAssignor = require('./loanRequestAssignor');
const loanRequestAssignor = new LoanRequestAssignor();

const loanRequestSchema = Joi.object({
  userEmailId: Joi.string().min(3).required(),
  loanAmount: Joi.number().min(100).required(),
});

const checkLoanRequestStatusSchema = Joi.object({
    loanRequestId: Joi.string().min(3).required()
  });

// CheckLoanStatus API
router.get("/checkLoanRequestStatus", verify, async (req, res) => {
    try {
        const { error } = await checkLoanRequestStatusSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Verify if requesting loan request exists in Database
        let loanRequest = await LoanRequest.findOne({ loanRequestId: req.body.loanRequestId });
        if(loanRequest) {
            res.status(200).send("Loan Status: " + loanRequest.currentStatus);
        } else {
            //User is not registered in DB. Loan request can not be added
            res.status(400).send("Could not Find any loan request with LoanId: " + req.body.loanRequestId);
        }
    } 
    catch (error) {
        console.log("error in checkStatus api's catch is: "+ error);
        res.status(400).send(error);
    }

});

// ApplyLoan API
router.post("/applyLoan", verify, async (req, res) => {
    var creationDate =  formCurrentDate();
    let loanRequest = new LoanRequest({
        userEmailId: req.body.userEmailId,
        creationTime: creationDate,
        lastUpdatedTime: creationDate,
        loanAmount: req.body.loanAmount,
    });
        //VALIDATION OF USER INPUTS
        const { error } = await loanRequestSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        else {
            try {
                // Verify if requesting user exists in Database
                let user = await User.findOne({ email: req.body.userEmailId });
                
                if(user) {
                    //NEW loan request is to be added
                    loanRequest.loanRequestId = uuidv4();
                    loanRequest.currentStatus = "NEW_REQUEST";
                    loanRequest.assignedCRMEmailId = loanRequestAssignor.getCustomerRelationshipManagerForLoanRequest();
                    await loanRequest.save();
                    res.status(200).send("Loan Applied Successfully. LoanRequest details: " + loanRequest);
                } else {
                    //User is not registered in DB. Loan request can not be added
                    res.status(400).send("Could not Apply for loan. User with EmailId:" + req.body.userEmailId + " is not Registered");
                }
            } 
            catch (error) {
                console.log("error in applyLoan api's catch is: "+ error);
                res.status(400).send(error);
            }
    }
});

function formCurrentDate() {
    var d = new Date();
    let month = d.getMonth()+1;
    let str = month;
    if(month<9) str= "0" + str;
    return d.getFullYear() + "-" + str + "-" +  d.getDate() ;
}

module.exports = router;

