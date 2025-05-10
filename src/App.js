import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AssignmentDetail from './pages/AssignmentDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/admin" element={<PrivateRoute role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="assignments/:id" element={<AssignmentDetail />} />
          </Route>
          
          <Route path="/student" element={<PrivateRoute role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="assignments/:id" element={<AssignmentDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;