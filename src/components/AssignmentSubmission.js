import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { submitAssignment, getAssignments } from '../services/api';

const AssignmentSubmission = ({ assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const assignments = await getAssignments();
        const foundAssignment = assignments.find(a => a.id === parseInt(assignmentId));
        setAssignment(foundAssignment);
        if (foundAssignment?.submission_text) {
          setSubmissionText(foundAssignment.submission_text);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [assignmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await submitAssignment(assignmentId, submissionText);
      setSuccess('Assignment submitted successfully!');
      // Refresh the assignment data
      const assignments = await getAssignments();
      const updatedAssignment = assignments.find(a => a.id === parseInt(assignmentId));
      setAssignment(updatedAssignment);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!assignment) {
    return <Alert variant="danger">Assignment not found</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{assignment.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Due: {new Date(assignment.due_date).toLocaleString()}
        </Card.Subtitle>
        <Card.Text>{assignment.description}</Card.Text>
        
        {assignment.is_completed && (
          <Alert variant="success">
            You submitted this assignment on {new Date(assignment.completed_at).toLocaleString()}
          </Alert>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Submission</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              disabled={assignment.is_completed}
              required
            />
          </Form.Group>
          {!assignment.is_completed && (
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AssignmentSubmission;