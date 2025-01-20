import axios from 'axios';
const API_BASE_URL = 'http://localhost:4000/api';

// Fetch user profile by userId
const dashboardService = {
  getUserProfile: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Expecting { name, email }
    } catch (error) {
      console.error('Error fetching user profile:', error.response?.data || error.message);
      throw error;
    }
  },


  
};
const getWalletBalance = async (userId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token
    const response = await axios.get(`${API_BASE_URL}/payments/wallet/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Expecting { remainingBalance }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default { dashboardService,getWalletBalance};
