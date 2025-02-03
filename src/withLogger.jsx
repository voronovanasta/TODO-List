/* eslint-disable react/display-name */
import { useEffect, useRef, useContext } from 'react';
import { TasksContext } from './TasksContext';

export function withLogger(WrappedComponent) {
  return (props) => {
    const { list } = useContext(TasksContext);
    const prevList = useRef([]);

    if (prevList.current.length < list.length) {
      console.log(`Task "${list.at(-1).item}" will be added!`);
    }
    if (prevList.current.length > list.length) {
      prevList.current.forEach((item) => {
        if (!list.some((el) => el.id === item.id)) {
          console.log(`Task "${item.item}" will be deleted!`);
        }
      });
    }
    if (prevList.current.length === list.length) {
      prevList.current.forEach((el, index) => {
        if (el.item !== list[index].item) {
          console.log(`Task "${el.item}" will be edited!`);
        }
      });
    }
    useEffect(() => {
      prevList.current = list;
    }, [list]);

    return <WrappedComponent {...props} />;
  };
}
