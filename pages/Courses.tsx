
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Search, Plus, Paperclip, ChevronLeft, Send, ChevronDown } from 'lucide-react';

const checkboxClasses = "appearance-none w-4 h-4 bg-white border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E')]";

const performanceData = [
  { name: 'Year 1', value: 50 },
  { name: 'Year 2', value: 25 },
  { name: 'Year 3', value: 72 },
  { name: 'Year 4', value: 80 },
  { name: 'Year 5', value: 30 },
  { name: 'Year 6', value: 70 },
];

const CoursesTab = () => {
  const registeredData = [
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'GES201.1', title: 'General Studies', type: 'General', unit: 2, lecturer: 'Dr. Azubuike Okocha' },
    { code: 'MTH210.1', title: 'Advanced Calculus', type: 'Faculty', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka' },
  ];

  const allCoursesData = [
    { code: 'CSC101.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Completed', color: 'green' },
    { code: 'CSC102.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Completed', color: 'green' },
    { code: 'GES100.1', title: 'Communication in English Language', type: 'General', unit: 2, lecturer: 'Dr. Azubuike Okocha', status: 'Pending Result', color: 'yellow' },
    { code: 'GES101.1', title: 'Human Philosophy', type: 'General', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Completed', color: 'green' },
    { code: 'CSC103.1', title: 'Computer Science Introduction', type: 'Department', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Completed', color: 'green' },
    { code: 'MTH110.1', title: 'Algebra and Trigonometry', type: 'Faculty', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Pending Result', color: 'yellow' },
    { code: 'MTH120.1', title: 'Calculus', type: 'Faculty', unit: 3, lecturer: 'Dr. Edward Nduka', status: 'Not Registered', color: 'red' },
  ];

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Registered Courses Section */}
      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
        <h2 className="text-base lg:text-lg font-bold text-[#1e293b] mb-8">Registered Courses</h2>
        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-4 w-12 text-center">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Code</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Course Title</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Type</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Unit</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Course Lecturer(s)</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {registeredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-400 text-[11px]">{row.code}</td>
                  <td className="px-4 py-4 font-bold text-[#1e293b] text-[11px]">{row.title}</td>
                  <td className="px-4 py-4 text-gray-400 font-medium text-[11px]">{row.type}</td>
                  <td className="px-4 py-4 text-gray-400 font-bold text-[11px]">{row.unit}</td>
                  <td className="px-4 py-4 text-gray-400 font-medium text-[11px]">{row.lecturer}</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-[#f0fdf4] text-[#22c55e] rounded-full text-[9px] font-bold uppercase tracking-wider">Registered</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Courses Section */}
      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">All Courses</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search by name" 
                className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-[11px] font-medium text-gray-400 focus:outline-none" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-auto bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-10 py-2.5 text-gray-500 uppercase appearance-none cursor-pointer">
                <option>All Courses</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={12} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-4 w-12 text-center">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Code</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Course Title</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Type</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Unit</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Course Lecturer(s)</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {allCoursesData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-400 text-[11px]">{row.code}</td>
                  <td className="px-4 py-4 font-bold text-[#1e293b] text-[11px]">{row.title}</td>
                  <td className="px-4 py-4 text-gray-400 font-medium text-[11px]">{row.type}</td>
                  <td className="px-4 py-4 text-gray-400 font-bold text-[11px]">{row.unit}</td>
                  <td className="px-4 py-4 text-gray-400 font-medium text-[11px]">{row.lecturer}</td>
                  <td className="px-4 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      row.color === 'green' ? 'bg-[#f0fdf4] text-[#22c55e]' : 
                      row.color === 'yellow' ? 'bg-[#fffbeb] text-[#f59e0b]' : 
                      'bg-[#fff1f2] text-[#f43f5e]'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ResultsTab = () => {
  const resultsData = [
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 20, exam: 55, total: 75, grade: 'A', remark: 'Distinction' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 2, ca: 24, exam: 39, total: 63, grade: 'B', remark: 'Very Good' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 7, exam: 50, total: 57, grade: 'C', remark: 'Credit' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 1, ca: 21, exam: 25, total: 46, grade: 'D', remark: 'Pass' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 10, exam: 30, total: 40, grade: 'E', remark: 'Bad' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 20, exam: 55, total: 75, grade: 'A', remark: 'Fail' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 20, exam: 55, total: 75, grade: 'A', remark: 'Distinction' },
    { code: 'CSC201.1', title: 'Computer Science Introduction', unit: 3, ca: 20, exam: 55, total: 75, grade: 'A', remark: 'Distinction' },
  ];

  const getRemarkStyle = (remark: string) => {
    switch(remark) {
      case 'Distinction': return 'bg-[#f0fdf4] text-[#22c55e]';
      case 'Very Good': return 'bg-[#ecfdf5] text-[#10b981]';
      case 'Credit': return 'bg-[#eff6ff] text-[#3b82f6]';
      case 'Pass': return 'bg-[#f0f9ff] text-[#0ea5e9]';
      case 'Bad': return 'bg-[#fff7ed] text-[#f97316]';
      case 'Fail': return 'bg-[#fff1f2] text-[#f43f5e]';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        {/* Performance Chart Card */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">Academic Performance</h2>
            <div className="relative">
              <select className="bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-8 py-2 text-gray-400 uppercase appearance-none cursor-pointer">
                <option>All Time</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>
          </div>
          <div className="h-64 lg:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  domain={[0, 100]} 
                  ticks={[0, 25, 50, 75, 100]} 
                />
                <Tooltip 
                  cursor={{ stroke: '#f1f5f9' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={{ r: 0 }} 
                  activeDot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CGPA Stats Card */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">CGPA</h2>
            <div className="relative">
              <select className="bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-8 py-2 text-gray-400 uppercase appearance-none cursor-pointer">
                <option>All Time</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-bold">Total Courses</span>
              <span className="text-[14px] font-bold text-[#1e293b]">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-bold">Total Grade Point</span>
              <span className="text-[14px] font-bold text-[#1e293b]">150</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-400 font-bold">Total Credit Unit</span>
              <span className="text-[14px] font-bold text-[#1e293b]">33</span>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-blue-100/50 flex items-center justify-between">
            <span className="text-gray-400 font-bold text-[13px]">Your CGPA</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-5xl font-black text-[#3b82f6]">4.5</span>
              <span className="text-sm font-bold text-gray-400">/5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">Results</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search by name" 
                className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-medium text-gray-400 focus:outline-none" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-auto bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-10 py-2.5 text-gray-500 uppercase appearance-none cursor-pointer">
                <option>All Semesters</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-4 w-12 text-center">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Code</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Course Title</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Unit</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">CA</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Exam</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Total</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Grade</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {resultsData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-5 text-center">
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-4 py-5 font-bold text-gray-400 text-[11px]">{row.code}</td>
                  <td className="px-4 py-5 font-bold text-[#1e293b] text-[11px]">{row.title}</td>
                  <td className="px-4 py-5 text-gray-400 font-bold text-[11px]">{row.unit}</td>
                  <td className="px-4 py-5 text-gray-400 font-bold text-[11px]">{row.ca}</td>
                  <td className="px-4 py-5 text-gray-400 font-bold text-[11px]">{row.exam}</td>
                  <td className="px-4 py-5 text-gray-400 font-bold text-[11px]">{row.total}</td>
                  <td className="px-4 py-5 text-gray-400 font-bold text-[11px]">{row.grade}</td>
                  <td className="px-4 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getRemarkStyle(row.remark)}`}>
                      {row.remark}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ApplicationDetail = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[70vh] lg:h-[750px] animate-in slide-in-from-right duration-300">
    <div className="px-6 lg:px-8 py-5 lg:py-6 border-b border-gray-50 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-3 lg:space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-[14px] lg:text-[15px] font-bold text-[#1e293b] truncate max-w-[150px] lg:max-w-none">Complaint - CPT011</h2>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-3">
        <span className="hidden sm:inline text-[11px] font-bold text-gray-400">Status</span>
        <span className="px-3 py-1 bg-[#eff6ff] text-[#3b82f6] rounded-full text-[9px] font-bold uppercase tracking-wider">Active</span>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8 bg-white custom-scrollbar">
      <div className="flex flex-col max-w-[90%] sm:max-w-[85%]">
        <div className="bg-[#eff6ff] p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-[#dbeafe]">
          <p className="text-[12px] lg:text-[13px] text-[#1e293b] leading-relaxed font-medium">
            I hope this message finds you well. I am writing to kindly notify you that my result for MTH 110.1 is currently missing...
          </p>
        </div>
        <span className="text-[10px] font-bold text-gray-300 mt-2 px-1">9:00 am</span>
      </div>

      <div className="flex flex-col max-w-[90%] sm:max-w-[85%] self-start">
        <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-[12px] lg:text-[13px] text-[#1e293b] leading-relaxed font-medium">
            Thank you for bringing this to my attention. Kindly confirm your full name and matric number...
          </p>
        </div>
        <span className="text-[10px] font-bold text-gray-300 mt-2 px-1 text-right">10:00 am</span>
      </div>
    </div>

    <div className="p-4 lg:p-8 bg-white border-t border-gray-50 shrink-0">
      <div className="relative group">
        <input 
          type="text" 
          placeholder="Type message..." 
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-4 lg:py-5 pl-5 lg:pl-8 pr-12 text-[13px] lg:text-sm font-medium text-[#1e293b] focus:outline-none transition-all"
        />
        <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 flex items-center">
          <button className="text-gray-400 hover:text-blue-500 p-1">
            <Paperclip size={20} />
          </button>
          <button className="ml-2 bg-[#3b82f6] p-2 rounded-xl text-white">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ApplicationsListView = ({ onLogNew, onSelect }: { onLogNew: () => void, onSelect: () => void }) => {
  const applications = [
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '30m ago', status: 'In Progress', color: 'blue' },
    { code: 'CPT011', subject: 'Result Remark Request', desc: 'I believe my result for MTH110.1 is not my score...', update: '3d ago', status: 'In Progress', color: 'blue' },
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '7d ago', status: 'Pending Review', color: 'pink' },
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '1w ago', status: 'Completed', color: 'green' },
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '2mon ago', status: 'Completed', color: 'green' },
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '1yr ago', status: 'Pending Review', color: 'pink' },
    { code: 'CPT011', subject: 'Missing Result Complaint', desc: 'My result for MTH110.1 is missing and i wrote...', update: '1yr ago', status: 'Completed', color: 'green' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-end mb-2">
        <button 
          onClick={onLogNew}
          className="flex items-center space-x-2 bg-[#3b82f6] text-white px-6 py-3 rounded-xl text-[13px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
        >
          <Plus size={18} />
          <span>Log New Application</span>
        </button>
      </div>

      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">All Applications</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <input type="text" placeholder="Search by subject, code, date" className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-[11px] font-medium text-gray-500 focus:outline-none" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-auto bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-10 py-2.5 text-gray-500 uppercase appearance-none cursor-pointer">
                <option>All Application</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={12} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-4 w-12">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Code</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Subject</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Description</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Last Update</th>
                <th className="px-4 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {applications.map((app, idx) => (
                <tr 
                  key={idx} 
                  onClick={onSelect}
                  className="hover:bg-[#f8fafc] transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-5" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-4 py-5 font-bold text-gray-500 text-[11px]">{app.code}</td>
                  <td className="px-4 py-5 font-bold text-[#1e293b] text-[11px]">{app.subject}</td>
                  <td className="px-4 py-5 text-gray-400 text-[11px] font-medium truncate max-w-[250px]">{app.desc}</td>
                  <td className="px-4 py-5 text-gray-500 font-bold text-[11px]">{app.update}</td>
                  <td className="px-4 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      app.color === 'blue' ? 'bg-[#eff6ff] text-[#3b82f6]' : 
                      app.color === 'green' ? 'bg-[#f0fdf4] text-[#22c55e]' : 
                      'bg-[#fff1f2] text-[#f43f5e]'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'courses' | 'results' | 'applications'>('courses');
  const [viewingDetail, setViewingDetail] = useState(false);

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-6 lg:space-y-8">
      {/* Sub-Tabs Navigation */}
      <div className="flex justify-center overflow-x-auto -mx-4 px-4 py-2">
        <div className="bg-white p-1 rounded-[20px] border border-gray-100 flex shadow-sm shrink-0">
          {(['courses', 'results', 'applications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveSubTab(tab);
                setViewingDetail(false);
              }}
              className={`px-6 sm:px-12 py-3 rounded-2xl text-[12px] lg:text-sm font-bold transition-all duration-300 ${
                activeSubTab === tab 
                  ? 'bg-[#3b82f6] text-white shadow-md' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering based on Sub-Tab and View State */}
      <div className="min-h-[600px]">
        {activeSubTab === 'courses' && <CoursesTab />}
        {activeSubTab === 'results' && <ResultsTab />}
        {activeSubTab === 'applications' && (
          viewingDetail ? (
            <ApplicationDetail onBack={() => setViewingDetail(false)} />
          ) : (
            <ApplicationsListView 
              onLogNew={() => setViewingDetail(true)} 
              onSelect={() => setViewingDetail(true)} 
            />
          )
        )}
      </div>
    </div>
  );
};

export default Courses;
