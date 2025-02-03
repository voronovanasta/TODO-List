import { Layout } from 'antd';
import { FormComponent } from '../components/FormComponent';
import { TasksContextComponent } from '../TasksContextComponent';
import { ListComponent } from '../components/ListComponent';

const { Content } = Layout;

export function MainPage() {
  return (
    <Layout className='custom-layout'>
      <h1>Get things done!</h1>
      <TasksContextComponent>
        <Content>
          <FormComponent />
        </Content>
        <Content style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <ListComponent style={{ display: 'flex', alignItems: 'center' }} />
        </Content>
      </TasksContextComponent>
    </Layout>
  );
}
