/* ************************
 * This file stores functions that are not directly part of the M-V-C process.
 * Its purpose is to take an array of inventory items, break each item and its data out of the 
 * array and embed it into HTML.
 ************************** */

const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Build/Constructs the HTML unordered Nav. list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
    // console.log(data)
    let list = '<ul id="nav-list">'
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build/Construct the HTML classification view of Vehicles
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Wk03-A: Building the single detail view of Classification of vehicles and wrapping it in HTML
* ************************************ */
Util.buildVehicleDetail = async function(vehicle) {
  let display
  if (vehicle) {
    display = '<div id="detail-display">'
    display += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '" />'
    display += '<section id="detail-info">'
    display += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' ' + vehicle.inv_year + '</h2>'
    display += '<p><strong>Price:</strong> $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
    display += '<p><strong>Description:</strong> ' + vehicle.inv_description + '</p>'
    display += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
    display += '<p><strong>Miles:</strong> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
    display += '</section>'
    display += '</div>'
  } else {
    display = '<p class="notice">Sorry, that vehicle could not be found.</p>'
  }
  return display
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util