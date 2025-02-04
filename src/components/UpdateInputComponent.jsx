/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import { Layout } from 'antd';

const { Content } = Layout;

export function UpdateInputComponent({ item, dispatch, setIsVisibleUpdateForm }) {
  const { handleSubmit, control } = useForm();
  console.log('update starts ' + item.completed);

  const onSubmit = (data) => {
    if (data.updatedTask) {
      dispatch({
        type: 'updated_item',
        item: data.updatedTask,
        updatedId: item.id,
      });
    }
    setIsVisibleUpdateForm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Controller
            defaultValue={item.item}
            name='updatedTask'
            control={control}
            render={({ field }) => <Input {...field} className='input update' />}
          />
          <Button className='button' htmlType='submit' type='primary'>
            Update
          </Button>
        </Content>
      </form>
    </>
  );
}
