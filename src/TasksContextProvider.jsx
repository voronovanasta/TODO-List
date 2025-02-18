/* eslint-disable react/prop-types */
import { useReducer, useEffect } from 'react';
import { TasksContext } from './TasksContext';
import { getTasks } from './service/taskService';

function reducer(list, action) {
  switch (action.type) {
    case 'added_task': {
      return [...list, { title: action.title, id: action.id, isCompleted: action.isCompleted }];
    }
    case 'deleted_task': {
      return list.filter((el) => el.id !== action.deletedId);
    }
    case 'edited_task': {
      return list.map((el) => {
        if (el.id === action.updatedId) {
          return { ...el, title: action.title };
        }
        return el;
      });
    }
    case 'completed_task': {
      return list.map((el) => {
        if (el.id === action.completedId) {
          return { ...el, isCompleted: action.isCompleted };
        }
        return el;
      });
    }
    case 'loaded_tasks': {
      return [...action.tasks];
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export function TasksContextProvider({ children }) {
  const [list, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const getTodos = async () => {
      const data = await getTasks();
      dispatch({ type: 'loaded_tasks', tasks: data.tasks });
    };
    getTodos();
  }, []);
  return <TasksContext.Provider value={{ list, dispatch }}>{children}</TasksContext.Provider>;
}
