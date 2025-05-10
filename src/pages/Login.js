import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const Login = () => {
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
              <Card.Title className="text-center">Login</Card.Title>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;