import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-redev.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (data) => {
  try {
    const response = await instance.post('/users/register', data);
    return {
      success: true,
      id: response.id,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await instance.post('/auth/login', data);
    console.log(response);
    return {
      success: true,
      token: response.data.token,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
