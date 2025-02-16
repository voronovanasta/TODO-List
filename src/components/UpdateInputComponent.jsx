/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import { Layout } from 'antd';
import { editTask } from '../service/taskService';

const { Content } = Layout;

export function UpdateInputComponent({ item, dispatch, setIsVisibleUpdateForm }) {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    if (data.editedTask) {
      const result = await editTask(item.id, data.editedTask);
      if (result.success) {
        dispatch({
          type: 'edited_task',
          title: data.editedTask,
          updatedId: item.id,
        });
      }
    }
    setIsVisibleUpdateForm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Controller
            defaultValue={item.title}
            name='editedTask'
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
