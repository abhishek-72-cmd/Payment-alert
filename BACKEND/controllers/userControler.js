const User = require('../models/userModel');

// Get basic user profile (name and email)
const getUserProfile = async (req, res) => {
  console.log('Route Hit: getUserProfile');
  console.log('UserId:', req.params.userId);
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.firstName,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get full user profile
const getFullUserProfile = async (req, res) => {
  console.log('Route Hit: getFullUserProfile');
  console.log('UserId:', req.params.userId);
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.firstName,
      email: user.email,
      phone: user.phoneNumber,
      address: user.address,
      gender: user.gender,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update profile code
const updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
  
      // Validate if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user with new data
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        message: 'Profile updated successfully',
        updatedUser,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


// Export the controller functions
module.exports = {
  getUserProfile,
  getFullUserProfile,
  updateUserProfile
};