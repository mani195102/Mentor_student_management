import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import Students from './pages/Students';
import MentorStudents from './components/MentorStudents';
import ChangeMentor from './components/ChangeMentor';

const { Header, Content } = Layout;

const App = () => (
  <Layout className="layout">
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/mentors">Mentors</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/students">Students</Link>
        </Menu.Item>
         <Menu.Item key="5">
          <Link to="/mentor-students">Mentor's Students</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/change-mentor">Change Mentor</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding: 24, minHeight: 280 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/students" element={<Students />} />
          <Route path="/mentor-students" element={<MentorStudents />} />
          <Route path="/change-mentor" element={<ChangeMentor />} />
        </Routes>
      </div>
    </Content>
  </Layout>
);

export default App;
