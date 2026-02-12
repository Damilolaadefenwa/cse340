/* WK06: FINAL ENHANCEMENT
* This is a controller for review, contains the logic that will the build view and
*  and direct the traffic between the user's browser and the database via the model, 
*/

const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 * 1. Function To handle Add a new review
 * ************************** */
reviewCont.addReview = async function (req, res) {
  const { review_text, inv_id, account_id } = req.body
  
  const result = await reviewModel.addReview(
    review_text,
    inv_id,
    account_id
  )

  if (result) {
    req.flash("notice", "Review added successfully.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, the review failed.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

/* ***************************
 * 2. Function to Build Edit Review View
 * ************************** */
reviewCont.buildEditReviewView = async function (req, res) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewById(review_id)
  
  // Security check if the review exists
  if (!reviewData) {
      req.flash("notice", "Review not found.")
      return res.redirect("/account/")
  }

  const itemName = `Review for Inventory Item #${reviewData.inv_id}`

  res.render("review/edit-review", {
    title: "Edit " + itemName,
    nav,
    errors: null,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
  })
}

/* ***************************
 * 3. Function that handle Update Review Process
 * ************************** */
reviewCont.updateReview = async function (req, res) {
  const { review_id, review_text } = req.body
  
  const result = await reviewModel.updateReview(review_id, review_text)

  if (result) {
    req.flash("notice", "Review updated successfully.")
    res.redirect("/account/") // Go back to their dashboard
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.redirect(`/review/edit/${review_id}`)
  }
}

/* ***************************
 * 4. Function To Build Delete Confirmation View
 * ************************** */
reviewCont.buildDeleteReviewView = async function (req, res) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewById(review_id)

  if (!reviewData) {
    req.flash("notice", "Review not found.")
    return res.redirect("/account/")
  }

  const itemName = `Review dated ${new Date(reviewData.review_date).toLocaleDateString()}`

  res.render("review/delete-review", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_date: reviewData.review_date,
  })
}

/* ***************************
 * 5. Function to Handle Delete Review Process
 * ************************** */
reviewCont.deleteReview = async function (req, res) {
  const { review_id } = req.body
  
  const result = await reviewModel.deleteReview(review_id)

  if (result) {
    req.flash("notice", "Review deleted successfully.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.redirect(`/review/delete/${review_id}`)
  }
}

module.exports = reviewCont