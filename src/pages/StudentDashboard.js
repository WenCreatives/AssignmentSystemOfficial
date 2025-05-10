import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import AssignmentList from '../components/AssignmentList';

const StudentDashboard = () => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <h1>My Assignments</h1>
        <AssignmentList />
      </Container>
    </>
  );
};

export default StudentDashboard;