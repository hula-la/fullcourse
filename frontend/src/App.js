import { Routes, Route } from 'react-router-dom';
import './App.css';
// Main
import Layout from './layout/Layout';
import MainPage from './pages/main/MainPage';
// User
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/user/ProfilePage';
// 404
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from './features/user/userActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* Main */}
        <Route path="" element={<MainPage />} />
        {/* user */}
        <Route path="user" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="profile/:pageNum" element={<ProfilePage />} />
        </Route>
        {/* trip */}
        <Route path="trip" element={<Layout />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
