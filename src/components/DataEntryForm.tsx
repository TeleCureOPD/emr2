import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addPatient, addWorker, Patient, Worker } from '../api';

interface FormData {
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

const DataEntryForm: React.FC = () => {
  const [isWorker, setIsWorker] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (isWorker) {
        await addWorker(data as Worker);
        alert('Worker data added successfully');
      } else {
        await addPatient(data as Patient);
        alert('Patient data added successfully');
      }
      reset();
    } catch (error) {
      console.error(error);
      alert('Error adding data');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{isWorker ? 'Worker' : 'Patient'} Data Entry</h2>
      <button onClick={() => setIsWorker(!isWorker)} className="bg-gray-500 text-white p-2 mb-4">
        Switch to {isWorker ? 'Patient' : 'Worker'} Form
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register('serialNumber', { required: 'Serial Number is required' })}
          placeholder="Serial Number"
          className="border p-2 w-full"
        />
        {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}
        
        <input
          type="text"
          {...register('fullName', { required: 'Full Name is required' })}
          placeholder="Full Name"
          className="border p-2 w-full"
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        
        <input
          type="text"
          {...register('fatherName', { required: 'Father\'s Name is required' })}
          placeholder="Father's Name"
          className="border p-2 w-full"
        />
        {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
        
        <input
          type="text"
          {...register('gender', { required: 'Gender is required' })}
          placeholder="Gender"
          className="border p-2 w-full"
        />
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        
        <input
          type="text"
          {...register('address', { required: 'Residence Address is required' })}
          placeholder="Residence Address"
          className="border p-2 w-full"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        
        <input
          type="date"
          {...register('dateOfBirth', { required: 'Date of Birth is required' })}
          className="border p-2 w-full"
        />
        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
        
        <input
          type="text"
          {...register('department', { required: 'Department is required' })}
          placeholder="Department"
          className="border p-2 w-full"
        />
        {errors.department && <p className="text-red-500">{errors.department.message}</p>}
        
        <input
          type="text"
          {...register('jobNature', { required: 'Nature of Job is required' })}
          placeholder="Nature of Job"
          className="border p-2 w-full"
        />
        {errors.jobNature && <p className="text-red-500">{errors.jobNature.message}</p>}
        
        <textarea
          {...register('medicalResults', { required: 'Medical Examination Results are required' })}
          placeholder="Medical Examination Results"
          className="border p-2 w-full"
        />
        {errors.medicalResults && <p className="text-red-500">{errors.medicalResults.message}</p>}
        
        <textarea
          {...register('allergies', { required: 'Allergies are required' })}
          placeholder="Allergies"
          className="border p-2 w-full"
        />
        {errors.allergies && <p className="text-red-500">{errors.allergies.message}</p>}
        
        <textarea
          {...register('previousConditions', { required: 'Previous Conditions are required' })}
          placeholder="Previous Conditions"
          className="border p-2 w-full"
        />
        {errors.previousConditions && <p className="text-red-500">{errors.previousConditions.message}</p>}
        
        <textarea
          {...register('vaccinations', { required: 'Vaccination Records are required' })}
          placeholder="Vaccination Records"
          className="border p-2 w-full"
        />
        {errors.vaccinations && <p className="text-red-500">{errors.vaccinations.message}</p>}
        
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Submit</button>
      </form>
    </div>
  );
};

export default DataEntryForm;