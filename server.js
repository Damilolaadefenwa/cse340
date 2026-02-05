/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const pool = require('./database/')
const expressLayouts = require("express-ejs-layouts")
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/index")
const accountRoute = require("./routes/accountRoute")
//Wk04
const bodyParser = require("body-parser")
//Wk05
const cookieParser = require("cookie-parser")


/* ***********************
 * Middleware
 * ************************/
//Any code in the middleware section will be allow to be implemented
//if it's absent then it's denied.
//WK04: created session
 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))
//1. Express Messages Middleware - WK03
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})
//2. Make the body-Parser available to the application: WK04
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//3. WK05 adding use statement for cookieParser.
app.use(cookieParser())
//4. W05 adding middleware function for JWTToken
app.use(utilities.checkJWTToken)



/* ***********************
 * View Engine and Templates
 *************************/
//Created in WK01 to control ejs.UI template
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
//1a.Public folder route - Wk01
app.use(static)
//1b. Index(Home-page) route - Wk01
app.get("/", utilities.handleErrors(baseController.buildHome))
//2.  Inventory route - WK02 for WK04
app.use("/inv", inventoryRoute)
//3.  Account route -Wk03
app.use("/account", accountRoute)
//4. File Not Found Route - must be last route in list WK04
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
// Setting up the control for all error handling in the application
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
   // Changing the title logic here
  const displayTitle = err.status === 404 ? '404 Error' : '500 Error';
  
  res.status(err.status || 500).render("errors/error", {
    title: displayTitle, // This sends "500 Error" to the view
    message: "Oh no! There was a crash. Maybe try a different route?",
    nav
  })
})


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
