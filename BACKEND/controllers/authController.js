const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, phoneNumber, dob, profilePicture, address, gender, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }, { phoneNumber }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ 
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      profilePicture,
      address,
      gender,
      password
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id, // Send user ID with the response
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const logoutUser = async (req, res) => {
  try {
    // Optionally invalidate the token (e.g., add it to a blacklist)
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = { registerUser, loginUser, logoutUser };
