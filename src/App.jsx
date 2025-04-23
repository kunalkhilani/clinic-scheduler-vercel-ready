import React, { useState, useEffect } from "react";
import "./index.css";

export default function FloorManagerDashboard() {
  const [completed, setCompleted] = useState({});
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([
    "Billing", "Fasting", "USG", "TMT", "ECG", "PFT", "X-Ray", "Echo", "PAP", "BCS", "PP", "Breakfast"
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        {
          name: "Patient 1",
          schedule: {
            Billing: "07:00-07:05",
            Fasting: "07:05-07:10",
            TMT: "07:30-08:00",
            USG: "08:30-08:37",
            Breakfast: "08:37-08:52",
            ECG: "08:52-08:59",
            Echo: "10:00-10:05",
            "X-Ray": "10:05-10:10",
            BCS: "10:10-10:30",
            PP: "10:52-10:57"
          }
        },
        {
          name: "Patient 2",
          schedule: {
            Billing: "07:05-07:10",
            Fasting: "07:10-07:15",
            TMT: "08:00-08:30",
            USG: "08:37-08:44",
            Breakfast: "08:44-08:59",
            PFT: "08:59-09:19",
            ECG: "09:19-09:26",
            PP: "10:59-11:04"
          }
        }
      ];
      setPatients(mockData);
    };
    fetchData();
  }, []);

  const toggleCompleted = (patient, test) => {
    const key = `${patient}-${test}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Floor Manager Dashboard</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 border rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Patient vs Procedure Grid</h2>
          <div className="flex items-center space-x-4 mb-4 text-sm">
            <span className="flex items-center">
              <span className="w-4 h-4 bg-blue-100 border border-gray-300 mr-1"></span> Scheduled
            </span>
            <span className="flex items-center">
              <span className="w-4 h-4 bg-green-200 border border-gray-300 mr-1"></span> Completed
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Patient</th>
                  {tests.map((test) => (
                    <th key={test} className="border px-2 py-1">{test}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1 font-medium">{patient.name}</td>
                    {tests.map((test, i) => {
                      const key = `${patient.name}-${test}`;
                      const isDone = completed[key];
                      const timeSlot = patient.schedule[test] || "-";
                      const cellStyle = isDone
                        ? "bg-green-200"
                        : timeSlot !== "-"
                        ? "bg-blue-100"
                        : "bg-white";
                      return (
                        <td
                          key={i}
                          className={`border px-2 py-1 text-center cursor-pointer ${cellStyle}`}
                          onClick={() => toggleCompleted(patient.name, test)}
                        >
                          {timeSlot}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border rounded-2xl shadow p-4 bg-blue-50">
          <h2 className="text-xl font-semibold mb-2">Efficiency Tips & Flow Strategy</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use anytime tests (ECG, PFT, X-Ray) to fill gaps while patients wait for fixed-time tests like USG or Echo.</li>
            <li>Continuously monitor this grid view to identify idle patients.</li>
            <li>Balance fasting/USG patients with others early in the day.</li>
            <li>Flag patients with long test sets for early scheduling.</li>
            <li>Always stack TMT back-to-back starting at 7:30 AM.</li>
            <li>Use visual queues at each room to keep staff and patients aligned.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
