import { ItemComponent } from './ItemComponent';
import { List } from 'antd';
import { TasksContext } from '../TasksContext';
import { useContext } from 'react';
import { withLogger } from '../withLogger';

function ToDoList() {
  const { list, dispatch } = useContext(TasksContext);

  return (
    <List
      size='small'
      dataSource={list}
      renderItem={(item) => <ItemComponent key={item.id} item={item} dispatch={dispatch} />}
      style={{ width: '32rem', margin: '1rem 0' }}
    />
  );
}
export const ListComponent = withLogger(ToDoList);
