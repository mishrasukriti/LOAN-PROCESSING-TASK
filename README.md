# LOAN-PROCESSING-TASK


# Bank Manager Credentials to view activity demo
{
    "email": "bankmanager@gmail.com",
    "password": "bankmanager"
}


# Customer Relationship Manager Credentials to view activity demo
{
    "email": "first_crmanager@gmail.com",
    "password": "first_crm"
}


{
    "email": "second_crmanager@gmail.com",
    "password": "second_crm"
}


{
    "email": "Third_crmanager@gmail.com",
    "password": "Third_crm"
}


{
    "email": "Fourth_crmanager@gmail.com",
    "password": "Fourth_crm"
}


# User Credentials to view activity demo
{
    "email": "user10@gmail.com",
    "password": "user10"
}
{
    "email": "user1@gmail.com",
    "password": "user1"
}
{
    "email": "user2@gmail.com",
    "password": "user2"
}


# Sample ApplyLoan API request
{
    "userEmailId": "user10@gmail.com",
    "loanAmount": "1000"
}


# Sample CheckLoanStatus API request
{
    "loanRequestId": "4024a98c-3791-457a-989a-30c0fd2405a5"
}


# Sample CustomerRelationshipManager listCRMLoanRequests API request
{
    "crmEmailId": "first_crmanager@gmail.com"
}

# Sample CustomerRelationshipManager updateLoanStatus API request
{
    "loanRequestId": "bb05c16d-59a4-4f8c-8961-959963f3f213",
    "isAccepted": true
}



# Sample BankManager updateLoanStatus API request
{
    "loanRequestId": "bb05c16d-59a4-4f8c-8961-959963f3f213",
    "isAccepted": false
}

# Sample BankManager listAllLoanRequests API request
{}
