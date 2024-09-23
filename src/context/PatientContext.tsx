import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getPatients, Patient } from '../api/patientApi';

interface PatientContextProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  fetchPatients: () => void;
}

export const PatientContext = createContext<PatientContextProps | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientContext.Provider value={{ patients, loading, error, fetchPatients }}>
      {children}
    </PatientContext.Provider>
  );
};