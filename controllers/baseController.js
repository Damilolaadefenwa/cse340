/* This M-C-V controller that contains Logic that build the 
 Home page view and direct the traffic related to it  
*/

const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //The code-line 11 is for testing.
  // req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

module.exports = baseController
