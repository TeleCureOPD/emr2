import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import PatientTable from './PatientTable';

const PatientList: React.FC = () => {
  const { patients, loading, error } = useContext(PatientContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return <PatientTable patients={patients} />;
};

export default PatientList;