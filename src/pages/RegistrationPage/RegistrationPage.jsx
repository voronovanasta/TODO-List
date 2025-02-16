import { useForm, Controller } from 'react-hook-form';
import { Input, Radio, Button, notification } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import * as yup from 'yup';
import './index.css';
import { createUser } from '../../service/authService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Поле обязательно для заполнения').email('Введите корректный email'),
  username: yup.string().required('Поле обязательно для заполнения'),
  password: yup
    .string()
    .required('Поле обязательно для заполнения')
    .min(8, 'Поле должно содержать минимум 8 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Пароль должен содержать хотя бы 1 заглавную букву, 1 число и 1 символ'
    ),
  gender: yup.string().required('Выберите пол'),
  age: yup
    .number()
    .required('Поле обязательно для заполнения')
    .min(10, 'Возраст должен быть не менее 10')
    .max(100, 'Возраст не может превышать 100'),
});

export function RegistrationPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, err) => {
    api[type]({
      message: type === 'success' ? 'Done' : 'Error',
      description:
        type === 'success' ? 'You are registered successfully!' : err.response.data.message,
      onclose:
        type === 'success'
          ? setTimeout(() => {
              navigate('/login');
            }, 3000)
          : null,
    });
  };

  useEffect(() => {
    document.body.classList.add('registration-body');
    return () => {
      document.body.classList.remove('registration-body');
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
    const res = await createUser(data);
    if (res.success) {
      openNotificationWithIcon('success');
    } else {
      openNotificationWithIcon('error', res.error);
    }
  };

  return (
    <>
      {contextHolder}
      <form className='registration' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-wrapper'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => <Input {...field} placeholder='username' />}
          />
          <p>{errors.text?.message}</p>
        </div>

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

        <div className='input-wrapper'>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Radio.Group>
            )}
          />
          <p>{errors.gender?.message}</p>
        </div>

        <div className='input-wrapper'>
          <Controller
            name='age'
            control={control}
            render={({ field }) => <Input type='number' {...field} placeholder='age' />}
          />
          <p>{errors.age?.message}</p>
        </div>

        <Button className='button registration-btn' type='primary' htmlType='submit'>
          sign up
        </Button>
      </form>
      <Link style={{ fontSize: '1rem' }} to='/login'>
        Already have an account? Log in
      </Link>
    </>
  );
}
