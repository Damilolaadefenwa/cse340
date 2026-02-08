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

// 2a. The route to display the "Add-classification Form"
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
// 2b. The route to process the data in the "Add-classification" Form
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);
// 3a. The route to display the "Add-Inventory Form".
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
// 3b. The route to process the data in the "Add-Inventory" Form.
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

// WK05-A.... 
// 1.The route to process the inventory by classification
// in the management view, So that the Javascript we added can work
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// 2a. Route to build the edit inventory view
// The :inv_id is a parameter that holds the ID of the car that will be edited
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))
// 2b. Route to handle the incoming request
router.post("/update/",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// 3a. The Route to build the delete-confirmation view page
router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteView))
// 3b. The Route to process the delete request
router.post("/delete", utilities.handleErrors(invController.deleteInventory))

module.exports = router;