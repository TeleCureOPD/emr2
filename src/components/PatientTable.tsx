import React from 'react';
import { Patient } from '../api/patientApi';

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white" aria-label="Patient List">
      <thead>
        <tr>
          <th className="py-2">Serial Number</th>
          <th className="py-2">Full Name</th>
          <th className="py-2">Father's Name</th>
          <th className="py-2">Gender</th>
          <th className="py-2">Address</th>
          <th className="py-2">Date of Birth</th>
          <th className="py-2">Department</th>
          <th className="py-2">Job Nature</th>
          <th className="py-2">Medical Results</th>
          <th className="py-2">Allergies</th>
          <th className="py-2">Previous Conditions</th>
          <th className="py-2">Vaccinations</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient._id}>
            <td className="border px-4 py-2">{patient.serialNumber}</td>
            <td className="border px-4 py-2">{patient.fullName}</td>
            <td className="border px-4 py-2">{patient.fatherName}</td>
            <td className="border px-4 py-2">{patient.gender}</td>
            <td className="border px-4 py-2">{patient.address}</td>
            <td className="border px-4 py-2">{patient.dateOfBirth}</td>
            <td className="border px-4 py-2">{patient.department}</td>
            <td className="border px-4 py-2">{patient.jobNature}</td>
            <td className="border px-4 py-2">{patient.medicalResults}</td>
            <td className="border px-4 py-2">{patient.allergies}</td>
            <td className="border px-4 py-2">{patient.previousConditions}</td>
            <td className="border px-4 py-2">{patient.vaccinations}</td>
            <td className="border px-4 py-2">
              <button onClick={() => onEdit(patient)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
              <button onClick={() => onDelete(patient._id)} className="bg-red-500 text-white p-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;