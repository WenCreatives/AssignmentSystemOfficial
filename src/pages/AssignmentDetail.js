import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import SubmissionList from '../components/SubmissionList';
import AssignmentSubmission from '../components/AssignmentSubmission';
import { getCurrentUser } from '../services/auth';

const AssignmentDetail = () => {
  const { id } = useParams();
  const user = getCurrentUser();

  return (
    <>
      <Header />
      <Container className="mt-4">
        {user?.role === 'admin' ? (
          <>
            <h1>Assignment Submissions</h1>
            <SubmissionList assignmentId={id} />
          </>
        ) : (
          <AssignmentSubmission assignmentId={id} />
        )}
      </Container>
    </>
  );
};

export default AssignmentDetail;