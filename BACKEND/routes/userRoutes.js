const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const verifyToken = require('../routes/verifyToken'); 

// Adjust the path as needed
router.get('/profile/:userId', async (req, res) => {
  console.log('Route Hit');
  console.log('UserId:', req.params.userId);
  try {
    const { userId } = req.params;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
