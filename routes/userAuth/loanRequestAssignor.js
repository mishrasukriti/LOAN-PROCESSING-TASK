class LoanRequestAssignor {
    constructor() {
        // Keeps track of CRM to be assigned from the 4 Customer relations managers. Value varies from 0 to 3.
        this.currentCRMIndex = 0;

        // Mapping CurrentCRMIndex to respective Customer Relationship managers emailId,
        this.crmMap = new Map();
        
        this.crmMap.set(0, "first_crmanager@gmail.com");
        this.crmMap.set(1, "second_crmanager@gmail.com");
        this.crmMap.set(2, "Third_crmanager@gmail.com");
        this.crmMap.set(3, "Fourth_crmanager@gmail.com");
    }

    // Assigns loan requests to CRMs in a round robin manner based on currentCRMIndex. Also, updates currentCRMIndex for next requests.
    getCustomerRelationshipManagerForLoanRequest() {
        this.currentCRMIndex = this.currentCRMIndex%4;
        return this.crmMap.get(this.currentCRMIndex++);
    }
  }

  module.exports = LoanRequestAssignor
