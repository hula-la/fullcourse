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
import ShareFcPage from './pages/share/SharedFcPage';
import DetailSharedFcPage from './pages/share/DetailSharedFcPage';
// Plan
import PlanPage from './pages/trip/PlanPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
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
        <Route path="fullcourse" element={<Layout />}>
          <Route path="" element={<ShareFcPage />} />
          <Route path="detail/:sharedFcId" element={<DetailSharedFcPage />} />
        </Route>
        {/* trip */}
        <Route path="trip" element={<Layout />}>
          <Route path="plan" element={<PlanPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
