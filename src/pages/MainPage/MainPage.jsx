import { Layout } from 'antd';
import { FormComponent } from '../../components/FormComponent';
import { TasksContextComponent } from '../../TasksContextComponent';
import { ListComponent } from '../../components/ListComponent';
import { useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const { Content } = Layout;

export function MainPage() {
  useEffect(() => {
    document.body.classList.add('main-body');
    return () => {
      document.body.classList.remove('main-body');
    };
  }, []);

  function logoutClickHandler() {
    localStorage.setItem('token', '');
  }
  return (
    <>
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
      <Link className='link' onClick={logoutClickHandler} to='/login'>
        logout
      </Link>
    </>
  );
}
