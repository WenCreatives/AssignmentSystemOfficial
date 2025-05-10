import { getAuthHeader } from './auth';

const API_BASE_URL = 'http://localhost:5000/api';

export const createAssignment = async (assignmentData) => {
  const response = await fetch(`${API_BASE_URL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(assignmentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create assignment');
  }
  
  return response.json();
};

export const getAssignments = async () => {
  const response = await fetch(`${API_BASE_URL}/assignments`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch assignments');
  }
  
  return response.json();
};

export const getAssignmentSubmissions = async (assignmentId) => {
  const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/submissions`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch submissions');
  }
  
  return response.json();
};

export const submitAssignment = async (assignmentId, submissionText) => {
  const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ submission_text: submissionText }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit assignment');
  }
  
  return response.json();
};

export const getStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/users/students`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  
  return response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  
  return response.json();
};

