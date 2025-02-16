import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import { Layout } from 'antd';
import { TasksContext } from '../TasksContext';
import { useContext } from 'react';
import { createTask } from '../service/taskService';

const { Content } = Layout;

export function FormComponent() {
  const { dispatch } = useContext(TasksContext);
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    const result = await createTask({ title: data.newTask });
    dispatch({
      type: 'added_task',
      title: result.task.title,
      id: result.task.id,
      isCompleted: result.task.isCompleted,
    });
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
