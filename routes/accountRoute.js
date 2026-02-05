/* This is a router file that contains & add the logic and structure 
 * to build an "accounts" router file that will handle the request 
 * to deliver the login view. 
* */

// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build the login view
// Instruction 3 & 4: This path follows "account" (which is handled in server.js)
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//  Route to build the Registration view
// 1. Instruction-2:
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Enable the Registration Route to process it
// router.post('/register', utilities.handleErrors(accountController.processAccount))
router.post(
  "/register",
  regValidate.registationRules(),   // Process the registration data
  regValidate.checkRegData,
  utilities.handleErrors(accountController.processRegister)
)
// WK04-Assignment: Route to Process the login Action
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.processLogin) // I will create this function in account-controller
)

//WK05-A: Route to build the Account Management view
router.get("/management", utilities.handleErrors(accountController.buildAccountManagement))


// Instruction 6: Export the router for use elsewhere
module.exports = router;