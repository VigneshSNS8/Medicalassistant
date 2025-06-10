import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Clock, Users, MapPin } from 'lucide-react';

interface Diagnosis {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reasoning: string;
  recommendedTests: string[];
  referralNeeded: boolean;
  treatmentOptions: string[];
}

interface DiagnosticResultsProps {
  diagnoses: Diagnosis[];
  isAnalyzing: boolean;
}

export default function DiagnosticResults({ diagnoses, isAnalyzing }: DiagnosticResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600';
    if (probability >= 60) return 'text-orange-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis in Progress</h2>
          <p className="text-gray-600">Processing medical data and generating diagnostic suggestions...</p>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (diagnoses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center text-gray-500">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p>Enter patient information and symptoms to generate diagnostic suggestions</p>
        </div>
      </div>
    );
  }

  const criticalDiagnoses = diagnoses.filter(d => d.severity === 'critical');

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalDiagnoses.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Critical Alert - Immediate Action Required</h3>
          </div>
          <div className="mt-2 text-red-700">
            {criticalDiagnoses.map((diagnosis, index) => (
              <p key={index} className="font-medium">• {diagnosis.condition}</p>
            ))}
            <p className="mt-2 text-sm">Contact emergency services or refer to nearest hospital immediately.</p>
          </div>
        </div>
      )}

      {/* Diagnostic Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">AI Diagnostic Analysis</h2>
          <div className="ml-auto flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Generated at {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="space-y-6">
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {diagnosis.condition}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Probability:</span>
                      <span className={`text-lg font-bold ${getProbabilityColor(diagnosis.probability)}`}>
                        {diagnosis.probability}%
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(diagnosis.severity)}`}>
                      {diagnosis.severity.charAt(0).toUpperCase() + diagnosis.severity.slice(1)} Priority
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-400">
                  #{index + 1}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Clinical Reasoning</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {diagnosis.reasoning}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Tests</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {diagnosis.recommendedTests.map((test, testIndex) => (
                      <li key={testIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Treatment Considerations</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {diagnosis.treatmentOptions.map((treatment, treatmentIndex) => (
                      <li key={treatmentIndex} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Referral Status</h4>
                  <div className="flex items-center">
                    {diagnosis.referralNeeded ? (
                      <>
                        <Users className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-orange-600 font-medium">Specialist Referral Recommended</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-600 font-medium">Can be managed locally</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Important Medical Disclaimer</p>
              <p>
                These AI-generated suggestions are for clinical decision support only and should not replace professional medical judgment. 
                Always consider patient's complete clinical picture and local medical protocols before making treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}