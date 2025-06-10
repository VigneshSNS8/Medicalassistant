import React, { useState } from 'react';
import { Activity, Clock, Thermometer, Plus, X } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

interface VitalSigns {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  oxygenSaturation: string;
}

interface SymptomCheckerProps {
  onSymptomsUpdate: (symptoms: Symptom[], vitals: VitalSigns) => void;
}

export default function SymptomChecker({ onSymptomsUpdate }: SymptomCheckerProps) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [vitals, setVitals] = useState<VitalSigns>({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: ''
  });

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Nausea', 'Vomiting',
    'Diarrhea', 'Abdominal pain', 'Chest pain', 'Shortness of breath',
    'Dizziness', 'Fatigue', 'Joint pain', 'Rash', 'Loss of appetite'
  ];

  const addSymptom = (symptomName: string) => {
    const symptom: Symptom = {
      id: Date.now().toString(),
      name: symptomName,
      severity: 'mild',
      duration: ''
    };
    const updatedSymptoms = [...symptoms, symptom];
    setSymptoms(updatedSymptoms);
    onSymptomsUpdate(updatedSymptoms, vitals);
    setNewSymptom('');
  };

  const updateSymptom = (id: string, field: keyof Symptom, value: string) => {
    const updatedSymptoms = symptoms.map(symptom =>
      symptom.id === id ? { ...symptom, [field]: value } : symptom
    );
    setSymptoms(updatedSymptoms);
    onSymptomsUpdate(updatedSymptoms, vitals);
  };

  const removeSymptom = (id: string) => {
    const updatedSymptoms = symptoms.filter(symptom => symptom.id !== id);
    setSymptoms(updatedSymptoms);
    onSymptomsUpdate(updatedSymptoms, vitals);
  };

  const updateVitals = (field: keyof VitalSigns, value: string) => {
    const updatedVitals = { ...vitals, [field]: value };
    setVitals(updatedVitals);
    onSymptomsUpdate(symptoms, updatedVitals);
  };

  return (
    <div className="space-y-6">
      {/* Vital Signs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Activity className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Vital Signs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Thermometer className="inline h-4 w-4 mr-1" />
              Temperature (°F)
            </label>
            <input
              type="number"
              step="0.1"
              value={vitals.temperature}
              onChange={(e) => updateVitals('temperature', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="98.6"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Pressure
            </label>
            <input
              type="text"
              value={vitals.bloodPressure}
              onChange={(e) => updateVitals('bloodPressure', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="120/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heart Rate (bpm)
            </label>
            <input
              type="number"
              value={vitals.heartRate}
              onChange={(e) => updateVitals('heartRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="72"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Respiratory Rate
            </label>
            <input
              type="number"
              value={vitals.respiratoryRate}
              onChange={(e) => updateVitals('respiratoryRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="16"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oxygen Saturation (%)
            </label>
            <input
              type="number"
              value={vitals.oxygenSaturation}
              onChange={(e) => updateVitals('oxygenSaturation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="98"
            />
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 text-orange-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Symptoms</h2>
        </div>
        
        {/* Quick Add Common Symptoms */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Common Symptoms (Click to Add):</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => addSymptom(symptom)}
                disabled={symptoms.some(s => s.name === symptom)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Symptom */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type custom symptom..."
              onKeyPress={(e) => e.key === 'Enter' && newSymptom.trim() && addSymptom(newSymptom.trim())}
            />
            <button
              onClick={() => newSymptom.trim() && addSymptom(newSymptom.trim())}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Current Symptoms */}
        {symptoms.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Current Symptoms:</h3>
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{symptom.name}</span>
                </div>
                
                <div>
                  <select
                    value={symptom.severity}
                    onChange={(e) => updateSymptom(symptom.id, 'severity', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
                
                <div>
                  <input
                    type="text"
                    value={symptom.duration}
                    onChange={(e) => updateSymptom(symptom.id, 'duration', e.target.value)}
                    className="w-24 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Duration"
                  />
                </div>
                
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}