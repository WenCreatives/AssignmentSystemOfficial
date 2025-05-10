import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ assignment, isAdmin = false }) => {
  const navigate = useNavigate();
  const isCompleted = assignment.is_completed;
  const dueDate = new Date(assignment.due_date);
  const now = new Date();
  const isOverdue = !isCompleted && now > dueDate;

  const handleView = () => {
    if (isAdmin) {
      navigate(`/admin/assignments/${assignment.id}`);
    } else {
      navigate(`/student/assignments/${assignment.id}`);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {assignment.title}
          {isCompleted && (
            <Badge bg="success" className="ms-2">
              Completed
            </Badge>
          )}
          {isOverdue && (
            <Badge bg="danger" className="ms-2">
              Overdue
            </Badge>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Due: {dueDate.toLocaleString()}
        </Card.Subtitle>
        <Card.Text>
          {assignment.description.length > 100
            ? `${assignment.description.substring(0, 100)}...`
            : assignment.description}
        </Card.Text>
        {isAdmin && (
          <Card.Text>
            <small>
              {assignment.completed_count} of {assignment.assigned_count} completed
            </small>
          </Card.Text>
        )}
        <Button variant="primary" onClick={handleView}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AssignmentCard;