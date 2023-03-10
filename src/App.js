import { Stack } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacebookPosts from './pages/FacebookPosts';
import {
  Comments,
  Home,
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar toggle={toggle} isOpen={isOpen} />
      <Stack w={'full'} justifyContent={'center'} alignItems={'center'}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/workflow'} element={<Workflow />} />
          <Route path={'/comments'} element={<Comments />} />
          <Route path={'/instagram'} element={<InstagramPosts />} />
          <Route path={'/facebook'} element={<FacebookPosts />} />
          <Route path={'/kanban'} element={<Kanban />} />
          <Route path={'/scheduler'} element={<Scheduler />} />
          <Route path={'/statistics'} element={<Statistics />} />
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
