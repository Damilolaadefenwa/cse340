/* WK06: FINAL ENHANCEMENT
 * This is a router file that contains & add the logic and structure 
 * to deliver review views based on user action to the browser. 
* */

const express = require("express")
const router = new express.Router() 
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")
const reviewValidate = require("../utilities/review-validation")

// 1. Add a new review (POST only - coming from the Detail View)
router.post(
  "/add",
  utilities.checkLogin, // MUST be logged in to post
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.addReview)
)

// 2. Deliver the Edit Review View (GET)
router.get(
  "/edit/:review_id",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.buildEditReviewView)
)

// 3. Process the Edit Review (POST)
router.post(
  "/update",
  utilities.checkLogin,
  reviewValidate.reviewRules(),      
  reviewValidate.checkUpdateReviewData,
  utilities.handleErrors(reviewController.updateReview)
)

// 4. Deliver the Delete Confirmation View (GET)
router.get(
  "/delete/:review_id",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.buildDeleteReviewView)
)

// 5. Process the Delete (POST)
router.post(
  "/delete",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.deleteReview)
)

module.exports = router