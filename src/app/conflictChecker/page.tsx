"use client"; 
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, X, AlertCircle, Clock, MapPin, Video } from 'lucide-react';

type SelectionsType = {
  sqa: string;
  sqaL: string;
  mtitL: string;
  mtitP: string;
};

const ScheduleDecisionFlow = () => {
  const [selections, setSelections] = useState<SelectionsType>({
    sqa: '',
    sqaL: '',
    mtitL: '',
    mtitP: ''
  });

  const fixedClasses = [
    { subject: 'PPW (L)', time: 'Wed 6 PM - 8 PM', location: 'Online', type: 'Fixed' },
    { subject: 'CN (P)', time: 'Fri 6 PM - 8 PM', location: 'F1303/F1304', type: 'Fixed' }
  ];

  const sqaOptions = [
    { id: 'thu', time: 'Thu 6 PM - 8 PM', location: 'G605', conflicts: [] },
    { id: 'sun', time: 'Sun 12 PM - 2 PM', location: 'F304', conflicts: ['mtitL-1'] }
  ];

  const sqaLectureOptions = [
    { id: 'sqaL-live', time: 'Sat 2 PM - 5 PM', location: 'G1402',type: 'Live Lecture',conflicts: ['mtitP-2'] },
    { id: 'sqaL-recording',time: 'Flexible',  location: 'Online',  type: 'Recording',conflicts: [] }
  ];

  const mtitLOptions = [
    { id: 'mtitL-1', time: 'Sun 11 AM - 2 PM', location: 'G1402', conflicts: ['sun', 'mtitP-3'] },
    { id: 'mtitL-2', time: 'Sun 2 PM - 5 PM', location: 'G1402', conflicts: ['mtitP-6'] }
  ];

  const mtitPOptions = [
    { id: 'mtitP-1', time: 'Sat 8 AM - 10 AM', location: 'B403', conflicts: [] },
    { id: 'mtitP-2', time: 'Sat 2 PM - 4 PM', location: 'F304', conflicts: ['sqaL-live'] },
    { id: 'mtitP-3', time: 'Sun 10 AM - 12 PM', location: 'G1102', conflicts: ['mtitL-1'] },
    { id: 'mtitP-4', time: 'Sun 8 AM - 10 AM', location: 'B401', conflicts: [] },
    { id: 'mtitP-5', time: 'Sat 6 PM - 8 PM', location: 'G1303', conflicts: [] },
    { id: 'mtitP-6', time: 'Sun 2 PM - 4 PM', location: 'G1104', conflicts: ['mtitL-2'] }
  ];

  const handleSelect = (type: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      [type]: prev[type as keyof SelectionsType] === value ? '' : value
    }));
  };

  const isConflicting = (option: { conflicts: string | string[]; }, type: string) => {
    if (type === 'sqa') {
      return option.conflicts.includes(selections.mtitL);
    } else if (type === 'mtitL') {
      return option.conflicts.includes(selections.sqa) || 
             option.conflicts.includes(selections.mtitP);
    } else {
      return option.conflicts.includes(selections.mtitL);
    }
  };

  const renderTimeSlot = (option: any, type: 'sqa' | 'sqaL' | 'mtitL' | 'mtitP') => {
    const isSelected = selections[type] === option.id;
    const hasConflict = isConflicting(option, type);

    return (
      <div
        key={option.id}
        onClick={() => handleSelect(type, option.id)}
        className={`
          p-4 rounded-lg cursor-pointer transition-all
          ${isSelected ? 'bg-green-100 border-2 border-green-500' : 
            hasConflict ? 'bg-red-50 border-2 border-red-200' : 
            'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'}
        `}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {option.type === 'Recording' ? (
              <Video className="h-4 w-4 text-gray-600" />
            ) : (
              <Clock className="h-4 w-4 text-gray-600" />
            )}
            <span className="font-medium">{option.time}</span>
          </div>
          {isSelected && <Check className="h-5 w-5 text-green-500" />}
          {hasConflict && !isSelected && <X className="h-5 w-5 text-red-500" />}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{option.location}</span>
        </div>
        {option.type && (
          <div className="mt-1 text-sm text-blue-600">
            {option.type}
          </div>
        )}
        {hasConflict && !isSelected && (
          <div className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Has conflicts</span>
          </div>
        )}
        
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Interactive Schedule Planner</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Fixed Classes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Fixed Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fixedClasses.map((cls, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{cls.subject}</span>
                  <span className="text-blue-600 text-sm">{cls.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{cls.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SQA Lecture */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Step 1: Choose SQA Lecture Option</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sqaLectureOptions.map(option => renderTimeSlot(option, 'sqaL'))}
          </div>
          {selections.sqaL === 'sqaL-recording' && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> By choosing the recording option, you have more flexibility in scheduling other classes during the Saturday 2-5 slot.
              </p>
            </div>
          )}
        </div>

        {/* SQA Practical */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Step 2: Choose SQA Practical</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sqaOptions.map(option => renderTimeSlot(option, 'sqa'))}
          </div>
        </div>

        {/* MTIT Lecture */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Step 3: Choose MTIT Lecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mtitLOptions.map(option => renderTimeSlot(option, 'mtitL'))}
          </div>
        </div>

        {/* MTIT Practical */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Step 4: Choose MTIT Practical</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mtitPOptions.map(option => renderTimeSlot(option, 'mtitP'))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Your Selected Schedule</h3>
          <div className="space-y-3">
            {Object.entries(selections).map(([key, value]) => {
              let options;
              let title;
              if (key === 'sqa') {
                options = sqaOptions;
                title = 'SQA Practical';
              } else if (key === 'sqaL') {
                options = sqaLectureOptions;
                title = 'SQA Lecture';
              } else if (key === 'mtitL') {
                options = mtitLOptions;
                title = 'MTIT Lecture';
              } else {
                options = mtitPOptions;
                title = 'MTIT Practical';
              }
              const selected = options.find(opt => opt.id === value);
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-medium">{title}:</span>
                  <span className={selected ? 'text-green-600' : 'text-red-500'}>
                    {selected ? `${selected.time} (${selected.location})` : 'Not selected'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDecisionFlow;