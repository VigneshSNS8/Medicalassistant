import React from 'react';
import { Stethoscope, Wifi, WifiOff, Shield, Bell } from 'lucide-react';

interface HeaderProps {
  isOnline: boolean;
  pendingSync: number;
  emergencyAlerts: number;
}

export default function Header({ isOnline, pendingSync, emergencyAlerts }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedAssist AI</h1>
              <p className="text-xs text-gray-500">Rural Healthcare Diagnostic System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {emergencyAlerts > 0 && (
              <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full">
                <Bell className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{emergencyAlerts} Critical</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <div className="flex items-center text-green-600">
                  <Wifi className="h-4 w-4 mr-1" />
                  <span className="text-sm">Online</span>
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <WifiOff className="h-4 w-4 mr-1" />
                  <span className="text-sm">Offline</span>
                  {pendingSync > 0 && (
                    <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded">
                      {pendingSync} pending sync
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center text-green-600">
              <Shield className="h-4 w-4 mr-1" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}