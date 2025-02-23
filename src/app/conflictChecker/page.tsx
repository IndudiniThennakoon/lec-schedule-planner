"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, X, AlertCircle, Clock, MapPin, Video } from 'lucide-react';

type SelectionsType = {
  SQAP: string;
  SQAL: string;
  MTITL: string;
  MTITP: string;
};

const ScheduleDecisionFlow = () => {
  const [selections, setSelections] = useState<SelectionsType>({
    SQAP: '',
    SQAL: '',
    MTITL: '',
    MTITP: ''
  });

  const fixedClasses = [
    { subject: 'PPW (L)', time: 'Wed 6 PM - 8 PM', location: 'Online', type: 'Fixed' },
    { subject: 'CN (P)', time: 'Fri 6 PM - 8 PM', location: 'F1303/4', type: 'Fixed' }
  ];

  const options = {
    SQAP: [
      { id: 'thu', time: 'Thu 6 PM - 8 PM', location: 'G605', conflicts: [] },
      { id: 'sun', time: 'Sun 12 PM - 2 PM', location: 'F304', conflicts: ['mtitL-1'] }
    ],
    SQAL: [
      { id: 'sqaL-live', time: 'Sat 2 PM - 5 PM', location: 'G1402', conflicts: ['mtitP-2'] },
      { id: 'sqaL-recording', time: 'Flexible', location: 'Online',  conflicts: [] }
    ],
    MTITL: [
      { id: 'mtitL-1', time: 'Sun 11 AM - 2 PM', location: 'G1402', conflicts: ['sun', 'mtitP-3'] },
      { id: 'mtitL-2', time: 'Sun 2 PM - 5 PM', location: 'G1402', conflicts: ['mtitP-6'] }
    ],
    MTITP: [
      { id: 'mtitP-1', time: 'Sat 8 AM - 10 AM', location: 'B403', conflicts: [] },
      { id: 'mtitP-2', time: 'Sat 2 PM - 4 PM', location: 'F304', conflicts: ['sqaL-live'] },
      { id: 'mtitP-3', time: 'Sun 10 AM - 12 PM', location: 'G1102', conflicts: ['mtitL-1'] },
      { id: 'mtitP-6', time: 'Sun 2 PM - 4 PM', location: 'G1104', conflicts: ['mtitL-2'] }
    ]
  };

  const handleSelect = (type: keyof SelectionsType, value: string) => {
    setSelections(prev => {
      const newSelections = { ...prev };
      
      if (newSelections[type] === value) {
        newSelections[type] = '';
      } else {
        newSelections[type] = value;
        
        Object.entries(newSelections).forEach(([key, selectedId]) => {
          if (selectedId && options[type].find(opt => opt.id === value)?.conflicts.includes(selectedId)) {
            newSelections[key as keyof SelectionsType] = '';
          }
        });
      }
      return newSelections;
    });
  };

  const formatKey = (key: string) => {
    return key.replace(/(SQA|MTIT)(P|L)/, "$1 ($2)");
  };
  

  const selectedSlots = fixedClasses.reduce((acc, cls) => {
    acc[cls.subject] = `${cls.time} at ${cls.location}`;
    return acc;
  }, {} as Record<string, string>);
  
  Object.entries(selections).forEach(([key, value]) => {
    if (value) {
      const option = options[key as keyof SelectionsType].find(opt => opt.id === value);
      if (option) {
        selectedSlots[formatKey(key)] = `${option.time} at ${option.location}`;
      }
    }
  });
  

  const renderTimeSlot = (option: any, type: keyof SelectionsType) => {
    const isSelected = selections[type] === option.id;
    const hasConflict = Object.values(selections).some(selectedId =>
      selectedId && option.conflicts.includes(selectedId)
    );
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
            {option.time === 'Flexible' ? (
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
          <div className="mt-1 text-sm text-blue-600">{option.type}</div>
        )}
        {hasConflict && !isSelected && (
          <div className="mt-2 text-sm text-red-500 flex items-center">
          </div>
        )}
        {/* {option.id === 'sqaL-recording' && (
          <p className="text-sm text-blue-800 mt-2">
            <strong>Note:</strong> By choosing the recording option, you have more flexibility in scheduling other classes during the Saturday 2 PM - 5 PM slot.
          </p>
        )} */}
      </div>
    );
    
  };


  

  return (
    <div className='flex justify-center bg-white p-5'>
      <Card className="w-full max-w-6xl border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">Schedule Planner</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div  className="border border-gray-300 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Fixed 
            lectures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fixedClasses.map((cls, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded-lg border  border-blue-400">
                <div className="flex items-center justify-between mb-2 ">
                  <span className="font-medium text-gray-900">{cls.subject}</span>
                  <span className="text-blue-600 text-sm">{cls.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{cls.time}    </span> 
                  {/* <MapPin className="h-4 w-4" /> */}
                  <span>({ cls.location})</span>
                </div>
              </div>
            ))}
          </div>
        
        </div>
        {Object.entries(options).map(([key, opts]) => (
          <div key={key} className="mb-8 border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">{formatKey(key)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              {opts.map(option => renderTimeSlot(option, key as keyof SelectionsType))}
            </div>
          </div>
        ))}

        <div className=" border border-gray-300 rounded-lg p-4 mb-8 bg-purple-100 ">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Selected Schedule</h3>
          <div className="space-y-2">
            {Object.entries(selectedSlots).map(([subject, slot]) => (
              <div key={subject} className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{subject}:</span>
                <span className={slot ? 'text-blue-900' : 'text-red-500'}>
                  {slot || 'Not selected'}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
       
      </CardContent>
    </Card>
    </div>
    
  );
};

export default ScheduleDecisionFlow;
