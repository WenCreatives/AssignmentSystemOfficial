import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to the Assignment System</h1>
      <p className="lead">
        Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to continue.
      </p>
    </Container>
  );
};

export default Home;