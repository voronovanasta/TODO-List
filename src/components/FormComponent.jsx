import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import { Layout } from 'antd';
import { TasksContext } from '../TasksContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;

export function FormComponent() {
  const { dispatch } = useContext(TasksContext);
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    if (data.newTask) {
      dispatch({ type: 'added_item', item: data.newTask, id: uuidv4(), completed: false });
    }
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Controller
            name='newTask'
            control={control}
            render={({ field }) => (
              <Input {...field} className='input' placeholder='add new task ...' />
            )}
          />
          <Button className='button' htmlType='submit' type='primary'>
            Add
          </Button>
        </Content>
      </form>
    </>
  );
}
