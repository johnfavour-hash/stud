
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, X, BookOpen, FileText, HandCoins } from 'lucide-react';

const checkboxClasses = "appearance-none w-4 h-4 bg-white border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E')]";

const MasterCardIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="8" r="7" fill="#EB001B" />
    <circle cx="17" cy="8" r="7" fill="#F79E1B" fillOpacity="0.8" />
  </svg>
);

const VisaIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.64 0.16H9.14L7.58 6.44H10.08L11.64 0.16ZM18.9 0.16L16.48 5.42L15.42 0.16H12.94L14.92 7.84H17.58L20.82 0.16H18.9ZM4.72 0.16L2.3 5.34L1.28 0.16H0L1.76 7.84H4.38L7.4 0.16H4.72ZM21.46 0.16H23.96L21.46 7.84H18.96L21.46 0.16Z" fill="#1A1F71"/>
  </svg>
);

const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M3 21h18" />
    <path d="M3 10h18" />
    <path d="m5 6 7-3 7 3" />
    <path d="M4 10v11" />
    <path d="M20 10v11" />
    <path d="M8 14v3" />
    <path d="M12 14v3" />
    <path d="M16 14v3" />
  </svg>
);

const StatusBadge = ({ status }: { status: 'Succeeded' | 'Pending' | 'Decline' }) => {
  const styles = {
    Succeeded: 'bg-[#f0fdf4] text-[#22c55e]',
    Pending: 'bg-[#fef9c3] text-[#a16207]',
    Decline: 'bg-[#fff1f2] text-[#f43f5e]'
  };
  
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center justify-center w-fit ${styles[status]}`}>
      {status === 'Succeeded' && <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mr-1.5"></span>}
      {status === 'Decline' && <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] mr-1.5"></span>}
      {status}
    </span>
  );
};

const NewPaymentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg p-8 lg:p-14 relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute right-8 top-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="text-center mb-12">
          <h2 className="text-[17px] font-black text-[#3b82f6]">Make New Payment</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center space-x-6 p-6 rounded-[20px] bg-[#eff3ff] border border-[#e0e7ff] hover:bg-[#e4ebff] transition-all group">
            <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              <BookOpen size={20} className="text-gray-400" />
            </div>
            <span className="text-[14px] font-bold text-gray-400">Pay for Course Registration</span>
          </button>

          <button className="w-full flex items-center space-x-6 p-6 rounded-[20px] bg-[#eff3ff] border border-[#e0e7ff] hover:bg-[#e4ebff] transition-all group">
            <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              <FileText size={20} className="text-gray-400" />
            </div>
            <span className="text-[14px] font-bold text-gray-400">Pay for Transcript</span>
          </button>

          <button className="w-full flex items-center space-x-6 p-6 rounded-[20px] bg-[#eff3ff] border border-[#e0e7ff] hover:bg-[#e4ebff] transition-all group">
            <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              <HandCoins size={20} className="text-gray-400" />
            </div>
            <span className="text-[14px] font-bold text-gray-400">Make Other Payments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Payments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const transactions = [
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'Course Registration', amount: 'N230,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N230,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'Deptmental dues', amount: 'N45,000', method: 'visa', card: '******7845', date: '23-08-2025', status: 'Pending' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'bank', card: 'Bank transfer', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'Course registration', amount: 'N45,000', method: 'bank', card: 'Bank transfer', date: '23-08-2025', status: 'Decline' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'Departmental dues', amount: 'N45,000', method: 'visa', card: '******7845', date: '23-08-2025', status: 'Decline' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
    { id: '06c1774d-46ad....90ae', from: 'Grace Hopkins', for: 'School fees', amount: 'N340,000', method: 'mastercard', card: '******7845', date: '23-08-2025', status: 'Succeeded' },
  ];

  return (
    <div className="p-4 lg:p-12 max-w-[1600px] mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1e293b]">Payments</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-xl text-[13px] font-black shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Make New Payment</span>
        </button>
      </div>

      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-base font-black text-[#1e293b]">Recent Payments</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search by name, email or code" 
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-[11px] font-medium text-gray-500 focus:outline-none" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
            <button className="flex items-center space-x-2 border border-gray-100 rounded-xl px-5 py-3 text-[11px] font-black text-gray-500 hover:bg-slate-50 transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-100 rounded-xl px-5 py-3 text-[11px] font-black text-gray-500 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <table className="w-full text-left min-w-[1100px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-100">
                <th className="px-5 py-4 w-12 text-center rounded-tl-2xl">
                  <input type="checkbox" className={checkboxClasses} />
                </th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Transaction Id</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Payment from</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Payment for</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Amount</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Payment method</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight">Date</th>
                <th className="px-5 py-4 font-black text-gray-400 uppercase text-[10px] tracking-tight rounded-tr-2xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-5 text-center">
                    <input type="checkbox" className={checkboxClasses} />
                  </td>
                  <td className="px-5 py-5 font-bold text-gray-400 text-[11px]">{t.id}</td>
                  <td className="px-5 py-5 font-bold text-gray-500 text-[11px]">{t.from}</td>
                  <td className="px-5 py-5 font-bold text-gray-500 text-[11px]">{t.for}</td>
                  <td className="px-5 py-5 font-black text-[#1e293b] text-[11px]">{t.amount}</td>
                  <td className="px-5 py-5">
                    <div className="flex items-center space-x-2">
                      {t.method === 'mastercard' && <MasterCardIcon />}
                      {t.method === 'visa' && <VisaIcon />}
                      {t.method === 'bank' && <BankIcon />}
                      <span className="text-[11px] font-bold text-gray-400">{t.card}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 font-bold text-gray-400 text-[11px]">{t.date}</td>
                  <td className="px-5 py-5">
                    <StatusBadge status={t.status as any} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Payments;
