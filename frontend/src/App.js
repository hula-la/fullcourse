import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from './features/user/userActions';
import './App.css';
// Main
import Layout from './layout/Layout';
import MainPage from './pages/main/MainPage';
import OnlyHeaderLayout from './layout/OnlyHeaderLayout';
// User
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/user/ProfilePage';
import ShareFcPage from './pages/share/SharedFcPage';
import DetailSharedFcPage from './pages/share/DetailSharedFcPage';
// Plan
import PlanPage from './pages/trip/PlanPage';
import SurveyPage from './pages/survey/SurveyPage';
import DetailFullcoursePage from './pages/user/DetailFullcoursePage';
// survey
import SurveyPage from './pages/survey/SurveyPage';
import RecommendPage from './pages/survey/RecommendPage';
// 404
import NotFound from './pages/NotFound';

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
          <Route path="fullcourse/:fcId" element={<DetailFullcoursePage />} />
        </Route>
        <Route path="fullcourse" element={<Layout />}>
          <Route path="" element={<ShareFcPage />} />
          <Route path="detail/:sharedFcId" element={<DetailSharedFcPage />} />
        </Route>
        {/* trip */}
        <Route path="trip" element={<OnlyHeaderLayout />}>
          <Route path="plan" element={<PlanPage />} />
          {/* survey 일정짜기 전 설문조사 */}
          <Route path="survey" element={<SurveyPage />} />
          <Route path="recommend" element={<RecommendPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
