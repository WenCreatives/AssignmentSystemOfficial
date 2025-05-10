import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Form } from 'react-bootstrap';
import { getStudents, updateUser } from '../services/api';

const UserList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setEditingId(student.id);
    setEditForm({
      full_name: student.full_name,
      email: student.email
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (studentId) => {
    try {
      await updateUser(studentId, editForm);
      const updatedStudents = students.map(student => 
        student.id === studentId ? { ...student, ...editForm } : student
      );
      setStudents(updatedStudents);
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

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
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.username}</td>
            <td>
              {editingId === student.id ? (
                <Form.Control
                  type="text"
                  name="full_name"
                  value={editForm.full_name}
                  onChange={handleEditChange}
                />
              ) : (
                student.full_name
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              ) : (
                student.email
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleSave(student.id)}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;