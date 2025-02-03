/* eslint-disable react/prop-types */
import { List, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { UpdateInputComponent } from './UpdateInputComponent';

export function ItemComponent({ item, dispatch }) {
  const ref = useRef();
  const [isVisibleUpdateForm, setIsVisibleUpdateForm] = useState(false);

  function clickHandler() {
    ref.current.classList.add('completed');
  }

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
          ref={ref}
          style={{ color: 'antiquewhite' }}
          className='item'
          onClick={clickHandler}
          actions={[
            <Button
              key='1'
              type='text'
              icon={<EditOutlined style={{ color: '#d7c62b', fontSize: '1.5rem' }} />}
              onClick={() => {
                setIsVisibleUpdateForm(true);
              }}
            />,
            <Button
              key='2'
              type='text'
              icon={<CloseOutlined style={{ color: 'antiquewhite', fontSize: '1.5rem' }} />}
              onClick={() => dispatch({ type: 'deleted_item', deletedId: item.id })}
            />,
          ]}
        >
          {item.item}
        </List.Item>
      )}
    </>
  );
}
