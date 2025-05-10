import React, { useState } from 'react';
import { Container, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import Header from '../components/Header';
import AssignmentList from '../components/AssignmentList';
import AssignmentForm from '../components/AssignmentForm';
import UserList from '../components/UserList';

const AdminDashboard = () => {
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [refreshAssignments, setRefreshAssignments] = useState(false);

  const handleAssignmentCreated = () => {
    setShowAssignmentModal(false);
    setRefreshAssignments(prev => !prev);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Dashboard</h1>
          <Button onClick={() => setShowAssignmentModal(true)}>
            Create Assignment
          </Button>
        </div>

        <Tabs defaultActiveKey="assignments" className="mb-3">
          <Tab eventKey="assignments" title="Assignments">
            <AssignmentList isAdmin={true} key={refreshAssignments} />
          </Tab>
          <Tab eventKey="students" title="Students">
            <UserList />
          </Tab>
        </Tabs>

        <Modal
          show={showAssignmentModal}
          onHide={() => setShowAssignmentModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AssignmentForm onSuccess={handleAssignmentCreated} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AdminDashboard;