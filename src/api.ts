import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Patient {
  _id: string;
  serialNumber: string;
  fullName: string;
  fatherName: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  department: string;
  jobNature: string;
  medicalResults: string;
  allergies: string;
  previousConditions: string;
  vaccinations: string;
}

export interface Worker {
  _id: string;
  serialNumber: string;
  fullName: string;
  fatherName: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  department: string;
  jobNature: string;
  medicalResults: string;
  allergies: string;
  previousConditions: string;
  vaccinations: string;
}

export interface User {
  username: string;
  email: string;
  full_name?: string;
  role: string;
}

export const addPatient = (patientData: Patient) => {
  return axios.post<Patient>(`${API_URL}/patients/`, patientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const addWorker = (workerData: Worker) => {
  return axios.post<Worker>(`${API_URL}/workers/`, workerData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getPatients = () => {
  return axios.get<Patient[]>(`${API_URL}/patients/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getWorkers = () => {
  return axios.get<Worker[]>(`${API_URL}/workers/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const deletePatient = (id: string) => {
  return axios.delete(`${API_URL}/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const deleteWorker = (id: string) => {
  return axios.delete(`${API_URL}/workers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updatePatient = (id: string, patientData: Patient) => {
  return axios.put<Patient>(`${API_URL}/patients/${id}`, patientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getUser = () => {
  return axios.get<User>(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};