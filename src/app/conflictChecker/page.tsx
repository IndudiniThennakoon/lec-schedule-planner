"use client"; 
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';

const conflictChecker = () => {
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({
    'PPW (L)': 'Wed 6-8 (Online)',
    'SQA (P)': '',
    'CN (P)': 'Fri 6-8 (F1303/F1304)',
    'MTIT (P)': '',
    'MTIT (L)': '',
    'SQA (L)': 'Sat 2-5 (G1402)'
  });

  const subjectOptions: Record<string, string[]> = {
    'PPW (L)': ['Wed 6-8 (Online)'],
    'SQA (P)': ['Thu 6-8 (G605)', 'Sun 12-2 (F304)'],
    'CN (P)': ['Fri 6-8 (F1303/F1304)'],
    'MTIT (P)': [
      'Sat 8-10 (B403)',
      'Sat 2-4 (F304)',
      'Sat 6-8 (G1303)',
      'Sun 8-10 (B401)',
      'Sun 10-12 (G1102)',
      'Sun 2-4 (G1104)'
    ],
    'MTIT (L)': ['Sun 11-2 (G1402)', 'Sun 2-5 (G1402)'],
    'SQA (L)': ['Sat 2-5 (G1402)']
  };

  const timeToMinutes = (timeStr: string) => {
    const [day, time]: [keyof typeof dayMap, string] = timeStr.split(' ') as [keyof typeof dayMap, string];
    const [start, end] = time.split('-').map(t => parseInt(t));
    const dayMap = {
      'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6
    };
    return {
      start: dayMap[day] * 24 * 60 + start * 60,
      end: dayMap[day] * 24 * 60 + end * 60
    };
  };

  const hasConflict = (slot1: string, slot2: string) => {
    if (!slot1 || !slot2) return false;
    const time1 = timeToMinutes(slot1.split(' (')[0]);
    const time2 = timeToMinutes(slot2.split(' (')[0]);
    return !(time1.end <= time2.start || time2.end <= time1.start);
  };

  const checkConflicts = (subject: string, slot: string) => {
    for (const [otherSubject, selectedSlot] of Object.entries(selectedSlots)) {
      if (subject !== otherSubject && selectedSlot && hasConflict(slot, selectedSlot)) {
        return otherSubject;
      }
    }
    return null;
  };

  const handleSlotSelect = (subject: string, slot: string) => {
    setSelectedSlots(prev => ({
      ...prev,
      [subject]: prev[subject] === slot ? '' : slot
    }));
  };

  return (
    <div className='flex justify-center bg-white p-5'>
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">Schedule Optimizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(subjectOptions).map(([subject, slots]) => (
            <div key={subject} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3  text-gray-900">{subject}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  text-gray-900">
                {slots.map(slot => {
                  const isSelected = selectedSlots[subject] === slot;
                  const conflict = checkConflicts(subject, slot);
                  
                  return (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(subject, slot)}
                      className={`p-3 rounded-md text-left relative  text-gray-900${
                        isSelected 
                          ? 'bg-green-100 border-2 border-green-500'
                          : conflict
                          ? 'bg-red-50 border-2 border-red-200'
                          : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-medium">{slot}</span>
                        {isSelected && (
                          <Check className="text-green-500 h-5 w-5" />
                        )}
                      </div>
                      {conflict && !isSelected && (
                        <div className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Conflicts with {conflict}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3  text-gray-900">Selected Schedule</h3>
          <div className="space-y-2">
            {Object.entries(selectedSlots).map(([subject, slot]) => (
              <div key={subject} className="flex justify-between">
                <span className="font-medium  text-gray-900">{subject}:</span>
                <span className={slot ? 'text-green-600' : 'text-red-500'}>
                  {slot || 'Not selected'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default conflictChecker;