/* This M-C-V controller that contains codes and function that build the view.
*  It hold the object of the database called through the 
* external link from the remote postgre database located in the index.js and evn. */

const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //The code-line 11 is for testing.
  // req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

module.exports = baseController
