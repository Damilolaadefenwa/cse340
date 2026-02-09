/* This is a controller for account, contains the logic 
*  that extract data from the model, build the view and direct  
*  the traffic that is associated with the account e.g account-model
*  and account-ejs-view.
*/

const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
// WK04: Acti-Learning: 
// const bcrypt = require("bcryptjs")
const { hash, compare } = require("bcryptjs")
//Wk05: Acti-Learning
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "LOGIN",
    nav,
    errors: null, //pass this to the view.
  })
}


/* ****************************************
*  Deliver Registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "REGISTRATION",
    nav,
    errors: null,  //pass this to the view.
  })
}

/* ****************************************
*  Function To Process Form Registration
* *************************************** */
async function processRegister(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    // hashedPassword = await bcrypt.hashSync(account_password, 10)
    hashedPassword = await hash(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "REGISTRATION",
      nav,
      errors: null,
    })
    return  // <--- FIX 1: Add 'return' to stop the code if hashing fails!
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult.rowCount) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "LOGIN",
      nav,
      errors: null, // <--- FIX 2: Login view needs 'errors' too!
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "REGISTRATION",
      nav,
      errors: null,  // <--- FIX 3: Register view needs 'errors' too!
    })
  }
}

/* ****************************************
 * Function To Process Login Request
 * ************************************ */
async function processLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    console.log(error)  // for debugging purpose
    throw new Error('Access Forbidden')
  }
  
  // For now, it will only send a message. I will add the real authentication later.
  // This is just an attempt to process the login 
  // req.flash("notice", "Process Login logic goes here.") 
  // res.redirect("/account/login")
}

/* ****************************************
 * WK05: Deliver Account Management View
 * *************************************** */
async function buildAccountManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
}

/* ***************************
 * wK05-ASSIGN: Build Account Update View
 * ************************** */
async function buildAccountUpdateView(req, res, next) {
  const account_id = parseInt(req.params.accountId)
  let nav = await utilities.getNav()
  const accountData = await accountModel.getAccountById(account_id)
  
  res.render("account/update", {
    title: "Edit Account",
    nav,
    errors: null,
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
  })
}

/* ***************************
 * wK05-ASSIGN: Process Account Update
 * ************************** */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  
  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  if (updateResult) {
    req.flash("notice", `Congratulations, ${account_firstname} you've successfully updated your account info.`)
    res.redirect("/account/") // Redirects to management view
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    })
  }
}

/* ***************************
 * wK05-ASSIGN: Process Password Change
 * ************************** */
async function changePassword(req, res) {
  let nav = await utilities.getNav()
  const { account_password, account_id } = req.body
  
  // Hash the new password
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the password.')
    res.status(500).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
      account_id, // Stickiness (only ID needed for password form)
    })
  }

  const updateResult = await accountModel.updatePassword(hashedPassword, account_id)

  if (updateResult) {
    req.flash("notice", `Congratulations, your password has been updated.`)
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the password update failed.")
    res.status(501).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
      account_id,
    })
  }
}

/* ****************************************
 * WK05-ASSIGN: Process Logout
 * ************************************ */
async function accountLogout(req, res) {
  res.clearCookie("jwt") //DeletING the cookie named 'jwt'
  req.flash("notice", "You have been logged out.") // Letting the user know
  res.redirect("/") //Sending them to the Home view
}


module.exports = {
  buildLogin,
  buildRegister,
  processRegister,
  processLogin,
  buildAccountManagement,
  buildAccountUpdateView,
  updateAccount,
  changePassword,
  accountLogout
}