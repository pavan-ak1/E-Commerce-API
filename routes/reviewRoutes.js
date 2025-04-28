const express = require('express');
const router = express.Router();
const {createReviews, getAllReviews, getSingleReviews, updateReviews, deleteReviews} = require('../controllers/reviewController');
const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

router.route('/').post(authenticateUser,createReviews).get(getAllReviews);

router.route('/:id').get(getSingleReviews).patch(authenticateUser, updateReviews).delete(authenticateUser, deleteReviews)

module.exports = router;


