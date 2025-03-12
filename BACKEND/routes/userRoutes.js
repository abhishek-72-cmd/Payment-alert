const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { getUserProfile, getFullUserProfile,updateUserProfile } = require('../../BACKEND/controllers/userControler'); 

// API to get basic user profile (name and email)
//API http://localhost:4000/api/users/profile/67a61271c4e40f315571aeba

router.get('/profile/:userId', getUserProfile);

// API to get full user profile
// API http://localhost:4000/api/users/Fullprofile/67a61271c4e40f315571aeba

router.get('/Fullprofile/:userId', getFullUserProfile);



//API to update the edited user profile
//API http://localhost:4000/api/users/updateProfile/67a61271c4e40f315571aeba

router.put('/updateProfile/:userId', updateUserProfile);


module.exports = router;




