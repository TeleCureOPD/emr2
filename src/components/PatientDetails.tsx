import React, { useEffect, useState } from 'react';
import { getPatient, Patient } from '../api/patientApi';

interface PatientDetailsProps {
  id: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ id }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPatient(id);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setError('Failed to fetch patient');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!patient) {
    return <p>No patient found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <p><strong>Serial Number:</strong> {patient.serialNumber}</p>
      <p><strong>Full Name:</strong> {patient.fullName}</p>
      <p><strong>Father's Name:</strong> {patient.fatherName}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Address:</strong> {patient.address}</p>
      <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
      <p><strong>Department:</strong> {patient.department}</p>
      <p><strong>Job Nature:</strong> {patient.jobNature}</p>
      <p><strong>Medical Results:</strong> {patient.medicalResults}</p>
      <p><strong>Allergies:</strong> {patient.allergies}</p>
      <p><strong>Previous Conditions:</strong> {patient.previousConditions}</p>
      <p><strong>Vaccinations:</strong> {patient.vaccinations}</p>
    </div>
  );
};

export default PatientDetails;