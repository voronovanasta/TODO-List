import './App.css';
import { MainPage } from './pages/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='login' element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='main' element={<MainPage />} />
      </Route>
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
