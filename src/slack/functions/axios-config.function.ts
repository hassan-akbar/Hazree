import axios from 'axios';

require('dotenv').config();

export const axiosInstance = axios.create({
  baseURL: 'https://slack.com/api',
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.SLACK_AUTH_TOKEN}`
  }
});
