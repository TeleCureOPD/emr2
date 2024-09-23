import React, { useEffect, useState } from 'react';
import { getWorkers, deleteWorker, updateWorker, Worker } from '../api';
import WorkerForm from './WorkerForm';
import WorkerTable from './WorkerTable';

const WorkerManagement: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    setFilteredWorkers(
      workers.filter(worker =>
        worker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, workers]);

  const fetchWorkers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWorkers();
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setError('Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this worker?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteWorker(id);
      setWorkers(workers.filter(worker => worker._id !== id));
    } catch (error) {
      console.error('Error deleting worker:', error);
      setError('Failed to delete worker');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (worker: Worker) => {
    setEditingWorker(worker);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorker) return;
    setLoading(true);
    setError(null);
    try {
      await updateWorker(editingWorker._id, editingWorker);
      setEditingWorker(null);
      setWorkers(workers.map(worker => worker._id === editingWorker._id ? editingWorker : worker));
    } catch (error) {
      console.error('Error updating worker:', error);
      setError('Failed to update worker');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingWorker) return;
    const { name, value } = e.target;
    setEditingWorker({ ...editingWorker, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Worker Management</h2>
      <input
        type="text"
        placeholder="Search by name or serial number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {editingWorker && (
        <WorkerForm
          worker={editingWorker}
          onChange={handleChange}
          onSubmit={handleUpdate}
        />
      )}
      <WorkerTable
        workers={filteredWorkers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default WorkerManagement;