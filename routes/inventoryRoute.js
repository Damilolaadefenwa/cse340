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
router.get("/", utilities.handleErrors(invController.buildManagement));

// 2a. Registering the add-classification data view route
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// 2a. The route to display the "Add-Inventory".
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
// 2b. The route to process the "Add-Inventory" data.
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);


module.exports = router;