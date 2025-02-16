import { useForm, Controller } from 'react-hook-form';
import { Input, Button, notification } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import * as yup from 'yup';
import './index.css';
import { loginUser } from '../../service/authService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Поле обязательно для заполнения').email('Введите корректный email'),
  password: yup
    .string()
    .required('Поле обязательно для заполнения')
    .min(6, 'Поле должно содержать минимум 6 символов')
    .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать хотя бы одну заглавную букву'),
});

export function LoginPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, err) => {
    api[type]({
      message: type === 'success' ? 'Done' : 'Error',
      description:
        type === 'success' ? 'You are logged in successfully!' : err.response.data.message,
      onclose:
        type === 'success'
          ? setTimeout(() => {
              navigate('/main');
            }, 3000)
          : null,
    });
  };
  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await loginUser(data);
    if (res.success) {
      localStorage.setItem('token', res.token);
      openNotificationWithIcon('success');
    } else {
      openNotificationWithIcon('error', res.error);
    }
  };

  return (
    <>
      {contextHolder}
      <form className='login' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-wrapper'>
          <Controller
            name='email'
            control={control}
            render={({ field }) => <Input {...field} placeholder='Email' />}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className='input-wrapper'>
          <Controller
            name='password'
            control={control}
            render={({ field }) => <Input type='text' {...field} placeholder='password' />}
          />
          <p>{errors.password?.message}</p>
        </div>

        <Button className='button login-btn' type='primary' htmlType='submit'>
          login
        </Button>
      </form>
      <Link style={{ fontSize: '1rem' }} to='/registration'>
        Dont have an account? Sign up
      </Link>
    </>
  );
}
