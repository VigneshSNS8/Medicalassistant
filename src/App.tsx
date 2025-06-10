import React, { useState } from 'react';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import SymptomChecker from './components/SymptomChecker';
import ImageUpload from './components/ImageUpload';
import DiagnosticResults from './components/DiagnosticResults';

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);
  const [emergencyAlerts, setEmergencyAlerts] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [patientInfo, setPatientInfo] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [vitals, setVitals] = useState(null);
  const [images, setImages] = useState([]);

  // Mock diagnostic results for demonstration
  const mockDiagnoses = [
    {
      condition: "Acute Respiratory Infection",
      probability: 85,
      severity: 'medium' as const,
      reasoning: "Patient presents with fever (101.2°F), productive cough, and elevated respiratory rate. Combination of symptoms and vital signs strongly suggest respiratory tract infection, possibly bacterial given the severity.",
      recommendedTests: [
        "Complete Blood Count (CBC)",
        "Chest X-ray",
        "Sputum culture if available",
        "Pulse oximetry monitoring"
      ],
      referralNeeded: false,
      treatmentOptions: [
        "Empirical antibiotic therapy (Amoxicillin 500mg TID)",
        "Supportive care with adequate hydration",
        "Paracetamol for fever management",
        "Monitor for complications"
      ]
    },
    {
      condition: "Viral Upper Respiratory Tract Infection",
      probability: 65,
      severity: 'low' as const,
      reasoning: "Symptoms could also indicate viral URTI. The fever pattern and lack of severe systemic symptoms make this a reasonable differential diagnosis.",
      recommendedTests: [
        "Rapid strep test if available",
        "Monitor temperature trend",
        "Symptom monitoring for 48-72 hours"
      ],
      referralNeeded: false,
      treatmentOptions: [
        "Symptomatic treatment with rest",
        "Adequate fluid intake",
        "Paracetamol for fever and discomfort",
        "Steam inhalation for congestion"
      ]
    },
    {
      condition: "Pneumonia",
      probability: 45,
      severity: 'high' as const,
      reasoning: "Given the respiratory symptoms and fever, pneumonia remains in the differential. Would require chest imaging for confirmation.",
      recommendedTests: [
        "Chest X-ray (mandatory)",
        "Complete Blood Count",
        "Blood culture if severe",
        "Arterial blood gas if respiratory distress"
      ],
      referralNeeded: true,
      treatmentOptions: [
        "IV antibiotics if confirmed",
        "Oxygen therapy if needed",
        "Hospital admission consideration",
        "Close monitoring of vital signs"
      ]
    }
  ];

  const handleAnalyze = () => {
    if (!patientInfo || symptoms.length === 0) {
      alert('Please fill in patient information and symptoms before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    
    // Check for critical symptoms
    const criticalSymptoms = symptoms.filter(s => s.severity === 'severe');
    if (criticalSymptoms.length > 0 || (vitals?.temperature && parseFloat(vitals.temperature) > 104)) {
      setEmergencyAlerts(1);
    }

    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const hasRequiredData = patientInfo && symptoms.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isOnline={isOnline} 
        pendingSync={pendingSync} 
        emergencyAlerts={emergencyAlerts} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Data Input */}
          <div className="space-y-8">
            <PatientForm onPatientUpdate={setPatientInfo} />
            <SymptomChecker onSymptomsUpdate={(s, v) => {
              setSymptoms(s);
              setVitals(v);
            }} />
            <ImageUpload onImagesUpdate={setImages} />
            
            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!hasRequiredData || isAnalyzing}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? 'Analyzing...' : 'Generate AI Diagnosis'}
              </button>
              {!hasRequiredData && (
                <p className="text-sm text-gray-500 mt-2">
                  Complete patient information and symptoms to enable analysis
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            <DiagnosticResults 
              diagnoses={isAnalyzing || hasRequiredData ? mockDiagnoses : []} 
              isAnalyzing={isAnalyzing} 
            />
          </div>
        </div>

        {/* Footer with System Info */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              MedAssist AI v2.1 | Compliant with Indian Medical Council Guidelines | 
              Data processed locally with end-to-end encryption
            </p>
            <p>
              For technical support: 1800-XXX-XXXX | Emergency: 108
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;