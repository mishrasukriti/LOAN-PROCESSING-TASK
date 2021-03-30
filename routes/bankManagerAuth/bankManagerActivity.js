// This file containts API implementation for various user related activities. For example: Applying Loan, Checking loan status etc.

const router = require("express").Router();
const verify = require("./bankManagerVerfiy");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");
const LoanRequest = require('../../models/LoanRequest');

const updateLoanStatusSchema = Joi.object({
    isAccepted: Joi.boolean().required(),
    loanRequestId: Joi.string().min(3).required(),
  });
  

// API to fetch all loan requests list for a customer relationship manager 
router.get("/listAllLoanRequests", verify, async (req, res) => {
    try {
        let loanRequests = await LoanRequest.find();
        res.status(200).send(loanRequests);
    } 
    catch (error) {
        console.log("error in getLoanRequestsList api's catch is: "+ error);
        res.status(400).send(error);
    }
});

// API to update status of a given loan request
router.put("/updateLoanStatus", verify, async (req, res) => {
    try {
        const { error } = await updateLoanStatusSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // Verify if requesting loan request exists in Database
        let loanRequest = await LoanRequest.findOne({ loanRequestId: req.body.loanRequestId });
        if(loanRequest) {
            if(loanRequest.currentStatus === 'NEW_REQUEST') {
                res.status(200).send("Loan request could not be updated as it is pending FIRST LEVEL REVIEW from customer relationship Manager. Current Status is:" + loanRequest.currentStatus);
            } else {
                if(req.body.isAccepted) {
                    loanRequest.currentStatus = "LOAN_REQUEST_APPROVED_ALL_LEVELS";
                    res.status(200).send("Loan request is Approved by Bank manager. Current Status is:" + loanRequest.currentStatus);
                }
                else {
                    loanRequest.currentStatus = "REJECTED_SECOND_LEVEL";
                    res.status(200).send("Loan request is Rejected by Bank Manager. Current Status is:" + loanRequest.currentStatus);
                }
                // Updating Loan Request status in database
                await loanRequest.save();
            }
        } else {
            //User is not registered in DB. Loan request can not be added
            res.status(400).send("Could not Find any loan request with LoanId: " + req.body.loanRequestId);
        }
    } 
    catch (error) {
        console.log("error in updateLoanStatus api's catch is: "+ error);
        res.status(400).send(error);
    }
});


module.exports = router;

