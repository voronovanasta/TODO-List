import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-redev.herokuapp.com/api/todos',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const getTasks = async () => {
  try {
    const response = await instance.get();
    return {
      success: true,
      tasks: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const createTask = async (data) => {
  try {
    const task = await instance.post(null, data);
    return {
      success: true,
      task: task.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.errors ? error.errors.msg : error.message,
    };
  }
};

export const deleteTask = async (id) => {
  try {
    const task = await instance.delete(`/${id}`);
    return {
      success: true,
      task: task.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.errors ? error.errors.msg : error.message,
    };
  }
};

export const completeTask = async (id) => {
  try {
    const task = await instance.patch(`/${id}/isCompleted`);
    return {
      success: true,
      task: task.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.errors ? error.errors.msg : error.message,
    };
  }
};

export const editTask = async (id, title) => {
  try {
    const task = await instance.patch(`/${id}`, { title: title });
    return {
      success: true,
      task: task.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.errors ? error.errors.msg : error.message,
    };
  }
};
