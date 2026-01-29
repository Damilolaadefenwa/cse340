/* This is a router file that contains & add the logic and structure 
 * to build an "accounts" router file that will handle the request 
 * to deliver the login view. 
* */

// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Route to build the login view
// Instruction 3 & 4: This path follows "account" (which is handled in server.js)
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Instruction 6: Export the router for use elsewhere
module.exports = router;