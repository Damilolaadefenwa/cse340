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

//WK05-A: Route to deliver the Account Management view
router.get("/",
  utilities.checkLogin,   //The checkLogin middleware.
  utilities.handleErrors(accountController.buildAccountManagement)
)

//WK05-ASSIGN:
 //1. Route to build the account update view
router.get("/update/:accountId", 
  utilities.checkLogin, // Ensuring they are logged in!
  utilities.handleErrors(accountController.buildAccountUpdateView)
)

//2. Route to handle the account update
router.post("/update", 
  utilities.checkLogin,
  regValidate.updateAccountRules(), // Using the new rules
  regValidate.checkUpdateUserData,  // Using the new check function
  utilities.handleErrors(accountController.updateAccount)
)

//3. Route to handle the password change
router.post("/change-password", 
  utilities.checkLogin,
  regValidate.changePasswordRules(), // Using password rules
  regValidate.checkPasswordData,     // Reusing checkRegData logic
  utilities.handleErrors(accountController.changePassword)
)


// Instruction 6: Export the router for use elsewhere
module.exports = router;