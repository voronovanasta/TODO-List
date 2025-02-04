/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import { TasksContext } from './TasksContext';

function reducer(list, action) {
  switch (action.type) {
    case 'added_item': {
      return [...list, { item: action.item, id: action.id, completed: action.completed }];
    }
    case 'deleted_item': {
      return list.filter((el) => el.id !== action.deletedId);
    }
    case 'updated_item': {
      return list.map((el) => {
        if (el.id === action.updatedId) {
          return { ...el, item: action.item };
        }
        return el;
      });
    }
    case 'completed_item': {
      return list.map((el) => {
        if (el.id === action.completedId) {
          return { ...el, completed: action.completed };
        }
        return el;
      });
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export function TasksContextComponent({ children }) {
  const [list, dispatch] = useReducer(reducer, []);

  return <TasksContext.Provider value={{ list, dispatch }}>{children}</TasksContext.Provider>;
}
