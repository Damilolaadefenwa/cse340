/* This is a router file that contains & add the logic and structure 
 * to deliver inventory items, based on their classification, 
 * to the browser when a navigation link is clicked. 
* */

// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invValidate = require('../utilities/inventory-validation')

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

//WK04-A: Registering the Management route
// 1. Route to build management view
router.get("/", utilities.handleErrors(invCont.buildManagement));

// 2. Registering the add-classification data view route
router.get("/add-classification", utilities.handleErrors(invCont.buildAddClassification));
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invCont.addClassification)
);


module.exports = router;