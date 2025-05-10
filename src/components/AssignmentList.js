import React from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import AssignmentCard from './AssignmentCard';
import { getAssignments } from '../services/api';

const AssignmentList = ({ isAdmin = false }) => {
  const [assignments, setAssignments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <Container>
      <Row>
        {assignments.map(assignment => (
          <Col key={assignment.id} md={6} lg={4} className="mb-4">
            <AssignmentCard assignment={assignment} isAdmin={isAdmin} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AssignmentList;