import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner } from 'react-bootstrap';
import { getAssignmentSubmissions } from '../services/api';

const SubmissionList = ({ assignmentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getAssignmentSubmissions(assignmentId);
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [assignmentId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student</th>
          <th>Email</th>
          <th>Status</th>
          <th>Submission</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map(submission => (
          <tr key={submission.student_id}>
            <td>{submission.full_name}</td>
            <td>{submission.email}</td>
            <td>
              {submission.is_completed ? (
                <Badge bg="success">Submitted</Badge>
              ) : (
                <Badge bg="warning" text="dark">
                  Pending
                </Badge>
              )}
            </td>
            <td>
              {submission.is_completed ? (
                <>
                  <p>{submission.submission_text}</p>
                  <small>
                    Submitted on: {new Date(submission.completed_at).toLocaleString()}
                  </small>
                </>
              ) : (
                'Not submitted yet'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubmissionList;