// WK06: FINAL ENHANCEMENT
// This file is part of M - V - C, it contain database queries. 
// for the interaction with the review table.

const pool = require("../database/index.js")

/* *****************************
 * 1. Function To Add a new review
 * *************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = "INSERT INTO review (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *"
    const data = await pool.query(sql, [review_text, inv_id, account_id])
    return data.rows[0]
  } catch (error) {
    console.error("addReview error: " + error)
  }
}

/* *****************************
 * 2. Function To Get all reviews for a specific vehicle
 * *************************** */
async function getReviewsByInventoryId(inv_id) {
  try {
    // Added "r.account_id" to the SELECT list below to fix innitial error
    const sql = `SELECT r.review_id, r.review_text, r.review_date, r.inv_id, r.account_id, a.account_firstname 
                 FROM public.review AS r 
                 JOIN public.account AS a 
                 ON r.account_id = a.account_id 
                 WHERE r.inv_id = $1 
                 ORDER BY r.review_date DESC`
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByInventoryId error: " + error)
  }
}

/* *****************************
 * 3. Function To Get a specific review by ID For 
 * the purpose of editing/deleting
 * *************************** */
async function getReviewById(review_id) {
  try {
    const sql = "SELECT * FROM public.review WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data.rows[0]
  } catch (error) {
    console.error("getReviewById error: " + error)
  }
}

/* *****************************
 * 4. A Function To Update a review
 * *************************** */
async function updateReview(review_id, review_text) {
  try {
    const sql = "UPDATE public.review SET review_text = $1 WHERE review_id = $2 RETURNING *"
    const data = await pool.query(sql, [review_text, review_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateReview error: " + error)
  }
}

/* *****************************
 * 5. A Function To Delete a review
 * *************************** */
async function deleteReview(review_id) {
  try {
    const sql = 'DELETE FROM review WHERE review_id = $1'
    const data = await pool.query(sql, [review_id])
    return data
  } catch (error) {
    console.error("deleteReview error: " + error)
  }
}

module.exports = {
  addReview,
  getReviewsByInventoryId,
  getReviewById,
  updateReview,
  deleteReview
}