
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const checkboxClasses = "appearance-none w-4 h-4 bg-white border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E')]";

const InputField = ({ label, placeholder, type = "text", isSelect = false }: { label: string, placeholder: string, type?: string, isSelect?: boolean }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-[13px] font-medium text-gray-500">{label}</label>
    <div className="relative">
      {isSelect ? (
        <>
          <select className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-[13px] text-gray-400 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-100">
            <option value="">{placeholder}</option>
            <option value="digital">Digital Delivery (Email)</option>
            <option value="courier">Courier Service</option>
            <option value="pickup">Physical Pickup</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={14} />
        </>
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-[13px] text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-blue-100 placeholder:text-gray-300" 
        />
      )}
    </div>
  </div>
);

const TranscriptRegView = () => (
  <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-12 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-xl font-bold text-[#1e293b] mb-8 lg:mb-10">Transcript Registration</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
      <InputField label="Name of receiving institution or organization" placeholder="University of Port..." />
      <InputField label="Mode of Transcript Delivery" placeholder="Select mode of delivery" isSelect />
      <InputField label="Recipient address" placeholder="Enter address" />
      <InputField label="Recipient address" placeholder="Enter address" />
      
      <div className="lg:col-span-2">
        <InputField label="Contact email/phone of recipient (if requested)" placeholder="Input contact information" />
      </div>
    </div>

    <div className="mt-8 text-[12px] text-gray-400 leading-relaxed font-medium">
      <p>
        Applicants are required to pay the prescribed transcript processing fee through the university's online portal. 
        The fee varies depending on the destination and mode of delivery and may range between <span className="font-bold text-gray-600">₦5,000</span> and <span className="font-bold text-gray-600">₦30,000</span>. 
        <span className="font-bold text-gray-600"> Additional courier or postage charges may apply for hard-copy deliveries.</span>
      </p>
      <p className="mt-2">
        All payments must be made online, and a payment receipt will be generated automatically upon successful transaction.
      </p>
    </div>

    <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
      <button className="bg-[#22c55e] hover:bg-green-600 text-white px-8 py-3 rounded-lg text-[13px] font-bold transition-all shadow-md shadow-green-100">
        Proceed to make payment
      </button>
      <button className="bg-white border border-gray-200 text-gray-500 px-8 py-3 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-all">
        Cancel
      </button>
    </div>
  </div>
);

const CoursesRegView = () => (
  <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-12 gap-6 lg:gap-8">
      {/* Registration Form */}
      <div className="col-span-12 lg:col-span-5 bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-lg lg:text-xl font-bold text-[#1e293b] mb-4">Course Registration</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
            <label className="text-[13px] font-bold text-[#1e293b]">Current Level</label>
            <div className="sm:col-span-2 relative">
              <select className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2.5 px-4 text-[13px] font-bold text-gray-400 appearance-none focus:outline-none">
                <option>200 Level</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
            <label className="text-[13px] font-bold text-[#1e293b]">Semester</label>
            <div className="sm:col-span-2 relative">
              <select className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2.5 px-4 text-[13px] font-bold text-gray-400 appearance-none focus:outline-none">
                <option>Select Semester</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
            <label className="text-[13px] font-bold text-[#1e293b]">Course Title</label>
            <div className="sm:col-span-2 relative">
              <input type="text" placeholder="Search course..." className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl py-2.5 px-4 text-[13px] font-bold text-[#1e293b] focus:outline-none placeholder:text-gray-200" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-50">
          <button className="w-full bg-[#22c55e] text-white py-3 rounded-lg text-[11px] font-bold hover:bg-green-600 transition-colors shadow-sm">Register</button>
          <button className="w-full bg-white border border-gray-200 text-[#1e293b] py-3 rounded-lg text-[11px] font-bold hover:bg-gray-50">Cancel</button>
        </div>
      </div>

      {/* Previewer Table */}
      <div className="col-span-12 lg:col-span-7 bg-[#fcfdfe] rounded-[24px] p-6 border border-gray-50 flex flex-col min-h-[400px]">
        <h2 className="text-sm font-bold text-[#1e293b] mb-6">Previewer</h2>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-3 w-8">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Code</th>
                <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Title</th>
                <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px] text-right">Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-400 text-[11px]">CSC201.1</td>
                  <td className="px-4 py-3 font-bold text-[#1e293b] text-[11px] truncate max-w-[150px]">Computer Science Intro</td>
                  <td className="px-4 py-3 font-bold text-gray-400 text-[11px] text-right">3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Table: Registered Courses */}
    <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-base lg:text-lg font-bold text-[#1e293b]">All Registered</h2>
        <div className="relative w-full sm:w-auto">
          <select className="w-full bg-[#f8fafc] border border-gray-100 text-[10px] font-bold rounded-lg pl-3 pr-8 py-2 text-gray-500 uppercase appearance-none cursor-pointer">
            <option>Current Session</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
        </div>
      </div>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-4 py-3 w-8">
                <input type="checkbox" className={checkboxClasses} />
              </th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Code</th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Course Title</th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Type</th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Unit</th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Lecturer(s)</th>
              <th className="px-4 py-3 font-bold text-gray-400 uppercase text-[10px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { code: 'CSC201.1', title: 'Computer Science Introduction', type: 'Dept', unit: 3, lecturer: 'Dr. Edward Nduka' },
              { code: 'GES201.1', title: 'General Studies II', type: 'General', unit: 2, lecturer: 'Dr. Azubuike Okocha' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4">
                  <input type="checkbox" className={checkboxClasses} />
                </td>
                <td className="px-4 py-4 font-bold text-gray-400 text-[11px]">{row.code}</td>
                <td className="px-4 py-4 font-bold text-[#1e293b] text-[11px]">{row.title}</td>
                <td className="px-4 py-4 text-gray-500 font-medium text-[11px]">{row.type}</td>
                <td className="px-4 py-4 text-gray-500 font-bold text-[11px]">{row.unit}</td>
                <td className="px-4 py-4 text-gray-500 font-medium text-[11px]">{row.lecturer}</td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-[#f0fdf4] text-[#22c55e] rounded-full text-[9px] font-bold uppercase tracking-wider">Registered</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

import { useNavigate, useLocation } from 'react-router-dom';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeSubTab = (() => {
    if (location.pathname.includes('/registration/transcript')) return 'transcript';
    if (location.pathname.includes('/registration/other')) return 'other';
    return 'courses';
  })();

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 lg:space-y-10">
      <div className="flex justify-center overflow-x-auto -mx-4 px-4 py-2">
        <div className="bg-white p-1 rounded-[20px] border border-gray-100 flex shadow-sm shrink-0">
          {(['courses', 'transcript', 'other'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => navigate(`/registration/${tab}`)}
              className={`px-8 lg:px-12 py-3 rounded-2xl text-[12px] lg:text-sm font-bold transition-all duration-300 ${
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

      <div className="min-h-[600px]">
        {activeSubTab === 'courses' && <CoursesRegView />}
        {activeSubTab === 'transcript' && <TranscriptRegView />}
        {activeSubTab === 'other' && <div className="text-center py-20 text-gray-300 font-bold">Other services coming soon.</div>}
      </div>
    </div>
  );
};

export default Registration;
