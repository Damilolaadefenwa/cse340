/* This M-C-V controller that contains codes and function that build the view and 
*  needed by the inventoryRoute file */

const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()

  //WK03-A Checking if data exists before getting the name
  let className = "Unknown"
  if (data.length > 0) {
    className = data[0].classification_name
  }

  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  WK03-A Adding a Function to handle the request for
 *  a specific vehicle and Build inventory item detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const detailHtml = await utilities.buildVehicleDetail(data)
  let nav = await utilities.getNav()
  
  if (data) {
    res.render("./inventory/detail", {
      title: data.inv_make + " " + data.inv_model,
      nav,
      detailHtml,
    })
  } else {
    // If no car found, move to error handler
    const err = new Error('Vehicle not found')
    err.status = 404
    next(err)
  }
}

/* ***************************
 *  WK03-A Building an error page for Intentional Error.
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  // This will fail because 'something' is not defined, triggering the error middleware
  let result = await something.notDefined(); 
  res.render("index", { title: "Error", nav: [] })
}

module.exports = invCont