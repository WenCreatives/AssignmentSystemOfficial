import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const Signup = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/student');
    return null;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Sign Up</Card.Title>
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;