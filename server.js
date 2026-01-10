/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 * Note: this file can typically have one of three different names:
 * index.js, app.js, or server.js.The reason I have choosen for us
 * to use server.js is that I think it adds clarity. 
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

/* ***********************
 * Routes
 *************************/
app.use(static)

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
