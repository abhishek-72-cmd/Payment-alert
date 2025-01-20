import axios from 'axios';
const API_URL = 'http://localhost:4000/api/auth';

const authService = {
  login: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data; // Ensure this returns token and any user-related data
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },



  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      return response.data; // Ensure this returns user registration confirmation
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      // Optional: Notify backend about logout if required
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error('Logout failed on the backend:', error.response?.data || error.message);
    } finally {
      // Clear localStorage or any stored session data
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  },
};



export default authService;
