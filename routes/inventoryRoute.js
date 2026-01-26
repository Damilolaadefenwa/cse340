/* This is a router file that contains & add the logic and structure 
 * to deliver inventory items, based on their classification, 
 * to the browser when a navigation link is clicked. 
* */

// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// WK03-A: Route to build inventory by classification view
// Wrapping the index.js in utilities.handleErrors to catch async errors
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// WK03-A: Route to build the specific inventory item detail view
// Also warapping in error handling.
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// WK03-A: Route to trigger an Intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

module.exports = router;