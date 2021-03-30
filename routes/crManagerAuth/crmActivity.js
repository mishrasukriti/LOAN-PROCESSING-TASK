// This file containts API implementation for various user related activities. For example: Applying Loan, Checking loan status etc.

path = require('path')
bodyParser = require('body-parser');

const router = require("express").Router();
const verify = require("./crManagerVerfiy");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");
const LoanRequest = require('../../models/LoanRequest');
const User = require('../../models/User');

const updateLoanStatusSchema = Joi.object({
    isAccepted: Joi.boolean().required(),
    loanRequestId: Joi.string().min(3).required(),
  });

const listCRMLoanRequestsSchema = Joi.object({
    crmEmailId: Joi.string().min(3).required(),
  });

// API to fetch all loan requests list for a customer relationship manager 
router.post("/listCRMLoanRequests", verify, async (req, res) => {
    try {
        // const { error } = await listCRMLoanRequestsSchema.validateAsync(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        // Verify if requesting user exists in Database
        console.log("got crmEmailId:" + req.body.crmEmailId);
        let crm = await User.findOne({ email: req.body.crmEmailId });

        if(crm) {
            let loanRequests = await LoanRequest.find({ assignedCRMEmailId: req.body.crmEmailId });
            res.status(200).send(loanRequests);
        } else {
            res.status(400).send("Customer Relations Manager with EmailId: " + req.body.crmEmailId + " does not exist.");    
        }
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
            if(req.body.isAccepted) {
                loanRequest.currentStatus = "CRM_APPROVED_PENDING_SECOND_LEVEL";
                res.status(200).send("Loan request is Approved and its pending second level approval now. Current Status is:" + loanRequest.currentStatus);
            }
            else {
                loanRequest.currentStatus = "REJECTED_BY_FIRST_LEVEL_CRM";
                res.status(200).send("Loan request is Rejected by Customer Relationships Manager. Current Status is:" + loanRequest.currentStatus);
            }
            // Updating Loan Request status in database
            await loanRequest.save();
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

