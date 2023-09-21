import { Stack } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacebookPosts from './pages/FacebookPosts';
import {
  Home,
  LoginPage,
  InstagramPosts,
  Kanban,
  Scheduler,
  Statistics,
  Workflow,
} from './pages';
import Sidebar from './components/Sidebar';
import { Facebook, Instagram, Tiktok } from './pages/statistics';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import UserRoute from './components/UserRoute';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Router>
      <ToastContainer position="top-right" limit={1} />
      <Navbar toggle={toggle} />
      <Sidebar toggle={toggle} isOpen={isOpen} />
      <Stack w={'full'} justifyContent={'center'} alignItems={'center'}>
        <Routes>
          <Route
            path={'/'}
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          <Route path={'/logare'} element={<LoginPage />} />
          <Route
            path={'/inregistrare'}
            element={
              <UserRoute>
                <RegisterPage />
              </UserRoute>
            }
          />
          <Route
            path={'/instagram'}
            element={
              <UserRoute>
                <InstagramPosts />
              </UserRoute>
            }
          />
          <Route
            path={'/facebook'}
            element={
              <UserRoute>
                <FacebookPosts />
              </UserRoute>
            }
          />

          <Route
            path={'/workflow'}
            element={
              <UserRoute>
                <Workflow />
              </UserRoute>
            }
          />
          <Route
            path={'/kanban'}
            element={
              <UserRoute>
                <Kanban />
              </UserRoute>
            }
          />
          <Route
            path={'/scheduler'}
            element={
              <UserRoute>
                <Scheduler />
              </UserRoute>
            }
          />

          <Route
            path={'/statistics'}
            element={
              <UserRoute>
                <Statistics />
              </UserRoute>
            }
          />
          {/* statistics subpages */}
          <Route path={'/statistics/facebook'} element={<Facebook />} />
          <Route path={'/statistics/instagram'} element={<Instagram />} />
          <Route path={'/statistics/tiktok'} element={<Tiktok />} />
        </Routes>
      </Stack>
    </Router>
  );
}

export default App;
