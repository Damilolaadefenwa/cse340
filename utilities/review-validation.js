//WK06: FINAL ENHANCEMENT
// As part of the MVC process:This file contains functio
// to execute data-intergrity-to validate that user typed
// safe and correct text(not submiting empty review or inject
// malicious script such as (<script>alert('hack')</script>))

const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * 1. Review Data Validation Rules
 * ********************************* */
validate.reviewRules = () => {
  return [
    body("review_text")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Review cannot be empty.")
      .isLength({ min: 1 })
      .withMessage("Please provide some text."),
  ]
}

/* ******************************
 * 2. Check data and return errors 
 * (For the "Add Review" process)
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
  const { inv_id, review_text } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    // If validation fails, redirect back to the detail view
    // and display the error as a flash message.
    req.flash("notice", errors.array()[0].msg) 
    res.redirect(`/inv/detail/${inv_id}`)
    return
  }
  next()
}

/* ******************************
 * 3. Check data and return errors 
 * (For the "Edit Review" process)
 * ***************************** */
validate.checkUpdateReviewData = async (req, res, next) => {
  const { review_id, review_text } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    // If edit fails, re-render the edit view with sticky data
    res.render("review/edit-review", {
      title: "Edit Review",
      nav,
      errors: errors,
      review_id,
      review_text,
    })
    return
  }
  next()
}

module.exports = validate