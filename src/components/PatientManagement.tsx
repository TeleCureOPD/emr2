import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient, updatePatient, Patient } from '../api';
import PatientForm from './PatientForm';
import PatientTable from './PatientTable';

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, patients]);

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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      setError('Failed to delete patient');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    setLoading(true);
    setError(null);
    try {
      await updatePatient(editingPatient._id, editingPatient);
      setEditingPatient(null);
      setPatients(patients.map(patient => patient._id === editingPatient._id ? editingPatient : patient));
    } catch (error) {
      console.error('Error updating patient:', error);
      setError('Failed to update patient');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPatient) return;
    const { name, value } = e.target;
    setEditingPatient({ ...editingPatient, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Patient Management</h2>
      <input
        type="text"
        placeholder="Search by name or serial number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {editingPatient && (
        <PatientForm
          patient={editingPatient}
          onChange={handleChange}
          onSubmit={handleUpdate}
        />
      )}
      <PatientTable
        patients={filteredPatients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PatientManagement;