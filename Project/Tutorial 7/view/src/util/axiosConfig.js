import axios from 'axios';

// IMPORTANT: Update this URL with your actual Firebase Functions URL
// After deploying your Firebase functions, you'll get a URL like:
// https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
// 
// To get your Firebase Functions URL:
// 1. Deploy your functions: firebase deploy --only functions
// 2. Copy the URL shown in the terminal after deployment
// 3. Replace the URL below

const API_URL = 'https://us-central1-todolist-fc678shd.cloudfunctions.net/api';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Export the configured instance as default
export default axiosInstance;