import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface User {
  username: string;
  email: string;
  full_name?: string;
  role: string;
}

export const getUser = () => {
  return axios.get<User>(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};