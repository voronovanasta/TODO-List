/* eslint-disable react/prop-types */
import { List, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UpdateInputComponent } from './UpdateInputComponent';
import { deleteTask, completeTask } from '../service/taskService';

export function ItemComponent({ item, dispatch }) {
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false);

  const completeClickHandler = async (e) => {
    e.stopPropagation();
    const result = await completeTask(item.id);
    if (result.success) {
      dispatch({ type: 'completed_task', completedId: item.id, isCompleted: !item.isCompleted });
    }
  };

  const deleteClickHandler = async (e) => {
    e.stopPropagation();
    const result = await deleteTask(item.id);
    if (result.success) {
      dispatch({ type: 'deleted_task', deletedId: item.id });
    }
  };

  return (
    <>
      {isVisibleUpdateForm && (
        <UpdateInputComponent
          item={item}
          dispatch={dispatch}
          setIsVisibleUpdateForm={setIsVisibleUpdateForm}
        />
      )}
      {!isVisibleUpdateForm && (
        <List.Item
          style={{ color: 'antiquewhite' }}
          className={item.isCompleted ? 'item completed' : 'item'}
          onClick={completeClickHandler}
          actions={[
            <Button
              key='1'
              type='text'
              icon={<EditOutlined style={{ color: '#d7c62b', fontSize: '1.5rem' }} />}
              onClick={(e) => {
                e.stopPropagation();
                setIsVisibleUpdateForm(true);
              }}
            />,
            <Button
              key='2'
              type='text'
              icon={<CloseOutlined style={{ color: 'antiquewhite', fontSize: '1.5rem' }} />}
              onClick={deleteClickHandler}
            />,
          ]}
        >
          {item.title}
        </List.Item>
      )}
    </>
  );
}
