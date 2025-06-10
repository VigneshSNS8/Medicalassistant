import React, { useState } from 'react';
import { User, Calendar, MapPin, Phone, FileText } from 'lucide-react';

interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  phone: string;
  village: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
}

interface PatientFormProps {
  onPatientUpdate: (patient: PatientInfo) => void;
}

export default function PatientForm({ onPatientUpdate }: PatientFormProps) {
  const [patient, setPatient] = useState<PatientInfo>({
    name: '',
    age: '',
    gender: '',
    phone: '',
    village: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: ''
  });

  const handleChange = (field: keyof PatientInfo, value: string) => {
    const updated = { ...patient, [field]: value };
    setPatient(updated);
    onPatientUpdate(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            value={patient.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient's full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={patient.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Age in years"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={patient.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={patient.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Village/Location
          </label>
          <input
            type="text"
            value={patient.village}
            onChange={(e) => handleChange('village', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Village name, District, State"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline h-4 w-4 mr-1" />
            Medical History
          </label>
          <textarea
            value={patient.medicalHistory}
            onChange={(e) => handleChange('medicalHistory', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Previous illnesses, surgeries, chronic conditions..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Medications
          </label>
          <textarea
            value={patient.currentMedications}
            onChange={(e) => handleChange('currentMedications', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List current medications and dosages..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Known Allergies
          </label>
          <textarea
            value={patient.allergies}
            onChange={(e) => handleChange('allergies', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Drug allergies, food allergies, etc..."
          />
        </div>
      </div>
    </div>
  );
}