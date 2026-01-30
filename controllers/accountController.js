/* This M-C-V controller that contains codes and function 
* that will process the request and return a view to the browser. 
*/

const utilities = require("../utilities/")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "LOGIN",
    nav,
  })
}


/* ****************************************
*  Deliver Registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "REGISTER",
    nav,
    errors: null
  })
}

module.exports = { buildLogin, buildRegister }