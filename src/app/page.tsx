import React from 'react';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';

const Timetable = () => {
  const timeSlots = [
    "8:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 2:00",
    "2:00 - 4:00",
    "4:00 - 6:00",
    "6:00 - 8:00"
  ];

  type Schedule = {
    [key: string]: { time: string; subject: string; location: string; type: string }[];
  };

  const schedule: Schedule = {
    "Wednesday": [
      { time: "6:00 - 8:00", subject: "PPW (L)", location: "Online", type: "Lecture" }
    ],
    "Thursday": [
      { time: "6:00 - 8:00", subject: "SQA (P)", location: "G605", type: "Practical" }
    ],
    "Friday": [
      { time: "6:00 - 8:00", subject: "CN (P)", location: "F1303/F1304", type: "Practical" }
    ],
    "Saturday": [
      { time: "8:00 - 10:00", subject: "MTIT (P)", location: "B403", type: "Practical" },
      { time: "2:00 - 4:00", subject: "MTIT (P)", location: "F304", type: "Practical" },
      { time: "2:00 - 5:00", subject: "SQA (L)", location: "G1402", type: "Lecture" },
      { time: "6:00 - 8:00", subject: "MTIT (P)", location: "G1303", type: "Practical" }
    ],
    "Sunday": [
      { time: "8:00 - 10:00", subject: "MTIT (P)", location: "B401", type: "Practical" },
      { time: "10:00 - 12:00", subject: "MTIT (P)", location: "G1102", type: "Practical" },
      { time: "11:00 - 2:00", subject: "MTIT (L)", location: "G1402", type: "Lecture" },
      { time: "12:00 - 2:00", subject: "SQA (P)", location: "F304", type: "Practical" },
      { time: "2:00 - 4:00", subject: "MTIT (P)", location: "G1104", type: "Practical" },
      { time: "2:00 - 5:00", subject: "MTIT (L)", location: "G1402", type: "Lecture" }
    ]
  };

  const days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getSubjectColor = (subject: string | string[]) => {
    const colors = {
      "PPW": "bg-blue-100",
      "SQA": "bg-green-100",
      "CN": "bg-purple-100",
      "MTIT": "bg-orange-100"
    };
    
    for (const [key, value] of Object.entries(colors)) {
      if (subject.includes(key)) return value;
    }
    return "bg-gray-100";
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Weekly Class Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 border bg-gray-50 font-semibold">Time / Day</th>
                {days.map(day => (
                  <th key={day} className="p-3 border bg-gray-50 font-semibold">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="p-3 border bg-gray-50 font-medium">{timeSlot}</td>
                  {days.map(day => {
                    const classes = schedule[day]?.filter(c => 
                      c.time.startsWith(timeSlot.split(" - ")[0]) ||
                      (timeSlot === "2:00 - 4:00" && c.time === "2:00 - 5:00") ||
                      (timeSlot === "12:00 - 2:00" && c.time === "11:00 - 2:00")
                    );
                    
                    return (
                      <td key={`${day}-${timeSlot}`} className="border p-2">
                        {classes?.map((cls, idx) => (
                          <div 
                            key={idx}
                            className={`${getSubjectColor(cls.subject)} p-2 rounded mb-1 last:mb-0`}
                          >
                            <div className="font-medium">{cls.subject}</div>
                            <div className="text-sm text-gray-600">{cls.location}</div>
                            <div className="text-xs text-gray-500">{cls.type}</div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timetable;