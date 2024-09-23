import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Patient } from '../api/patientApi';

interface PatientFormProps {
  patient: Patient;
  onSubmit: (data: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Patient>({
    defaultValues: patient
  });

  const onSubmitHandler: SubmitHandler<Patient> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 mb-4" aria-label="Edit Patient Form">
      <input
        type="text"
        {...register('serialNumber', { required: 'Serial Number is required' })}
        placeholder="Serial Number"
        className="border p-2 w-full"
        aria-label="Serial Number"
      />
      {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}
      
      <input
        type="text"
        {...register('fullName', { required: 'Full Name is required' })}
        placeholder="Full Name"
        className="border p-2 w-full"
        aria-label="Full Name"
      />
      {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      
      <input
        type="text"
        {...register('fatherName', { required: 'Father\'s Name is required' })}
        placeholder="Father's Name"
        className="border p-2 w-full"
        aria-label="Father's Name"
      />
      {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
      
      <input
        type="text"
        {...register('gender', { required: 'Gender is required' })}
        placeholder="Gender"
        className="border p-2 w-full"
        aria-label="Gender"
      />
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
      
      <input
        type="text"
        {...register('address', { required: 'Residence Address is required' })}
        placeholder="Residence Address"
        className="border p-2 w-full"
        aria-label="Residence Address"
      />
      {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      
      <input
        type="date"
        {...register('dateOfBirth', { required: 'Date of Birth is required' })}
        className="border p-2 w-full"
        aria-label="Date of Birth"
      />
      {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
      
      <input
        type="text"
        {...register('department', { required: 'Department is required' })}
        placeholder="Department"
        className="border p-2 w-full"
        aria-label="Department"
      />
      {errors.department && <p className="text-red-500">{errors.department.message}</p>}
      
      <input
        type="text"
        {...register('jobNature', { required: 'Nature of Job is required' })}
        placeholder="Nature of Job"
        className="border p-2 w-full"
        aria-label="Nature of Job"
      />
      {errors.jobNature && <p className="text-red-500">{errors.jobNature.message}</p>}
      
      <textarea
        {...register('medicalResults', { required: 'Medical Examination Results are required' })}
        placeholder="Medical Examination Results"
        className="border p-2 w-full"
        aria-label="Medical Examination Results"
      />
      {errors.medicalResults && <p className="text-red-500">{errors.medicalResults.message}</p>}
      
      <textarea
        {...register('allergies', { required: 'Allergies are required' })}
        placeholder="Allergies"
        className="border p-2 w-full"
        aria-label="Allergies"
      />
      {errors.allergies && <p className="text-red-500">{errors.allergies.message}</p>}
      
      <textarea
        {...register('previousConditions', { required: 'Previous Conditions are required' })}
        placeholder="Previous Conditions"
        className="border p-2 w-full"
        aria-label="Previous Conditions"
      />
      {errors.previousConditions && <p className="text-red-500">{errors.previousConditions.message}</p>}
      
      <textarea
        {...register('vaccinations', { required: 'Vaccination Records are required' })}
        placeholder="Vaccination Records"
        className="border p-2 w-full"
        aria-label="Vaccination Records"
      />
      {errors.vaccinations && <p className="text-red-500">{errors.vaccinations.message}</p>}
      
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Update</button>
    </form>
  );
};

export default PatientForm;