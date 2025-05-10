import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { createAssignment, getStudents } from '../services/api';

const AssignmentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    student_ids: []
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStudentSelect = (studentId) => {
    setFormData(prev => {
      if (prev.student_ids.includes(studentId)) {
        return {
          ...prev,
          student_ids: prev.student_ids.filter(id => id !== studentId)
        };
      } else {
        return {
          ...prev,
          student_ids: [...prev.student_ids, studentId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createAssignment(formData);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Assign to Students</Form.Label>
        <Row>
          {students.map(student => (
            <Col key={student.id} md={4}>
              <Form.Check
                type="checkbox"
                id={`student-${student.id}`}
                label={`${student.full_name} (${student.email})`}
                checked={formData.student_ids.includes(student.id)}
                onChange={() => handleStudentSelect(student.id)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Assignment'}
      </Button>
    </Form>
  );
};

export default AssignmentForm;