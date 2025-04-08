const express = require('express')
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');


const { getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,} = require('../controllers/userController');

    
router.route('/').get(authenticateUser,getAllUser);

router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updateUserPassword);
router.route('/:id').get(authenticateUser,getSingleUser);

module.exports = router;