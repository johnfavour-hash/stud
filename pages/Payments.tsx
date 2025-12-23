
import React from 'react';
import { CreditCard, Download, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { Payment } from '../types';

const mockPayments: Payment[] = [
  { id: '1', description: 'Semester Tuition - Fall 2023', amount: 5400.00, dueDate: 'Paid Oct 01, 2023', status: 'Paid' },
  { id: '2', description: 'Lab Equipment Fee', amount: 120.00, dueDate: 'Due Oct 30, 2023', status: 'Pending' },
  { id: '3', description: 'Library Overdue Fine', amount: 15.50, dueDate: 'Paid Sep 15, 2023', status: 'Paid' },
  { id: '4', description: 'Housing Deposit', amount: 1500.00, dueDate: 'Due Nov 15, 2023', status: 'Pending' },
];

const Payments: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payments & Billing</h1>
        <p className="text-sm text-gray-500">View invoices and manage your university payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Outstanding</h3>
          <p className="text-3xl font-bold text-gray-800">$1,620.00</p>
          <div className="flex items-center text-amber-600 text-xs font-semibold mt-2">
            <AlertCircle size={14} className="mr-1" />
            <span>2 payments pending</span>
          </div>
          <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            Pay Outstanding
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Last Payment</h3>
            <p className="text-3xl font-bold text-gray-800">$5,400.00</p>
            <div className="flex items-center text-green-600 text-xs font-semibold mt-2">
              <CheckCircle size={14} className="mr-1" />
              <span>Received on Oct 01</span>
            </div>
            <button className="mt-6 flex items-center space-x-2 text-blue-600 text-sm font-bold hover:text-blue-700">
              <span>View Receipt</span>
              <ExternalLink size={14} />
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Payment Method</h3>
          <div className="flex items-center space-x-3 mt-4">
            <div className="bg-slate-100 p-2 rounded-lg">
              <CreditCard size={24} className="text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Visa ending in 4242</p>
              <p className="text-xs text-gray-500">Expires 12/26</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
            Manage Methods
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Transaction History</h2>
          <button className="flex items-center space-x-2 text-xs font-bold text-blue-600 border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            <Download size={14} />
            <span>Export Statement</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date/Due</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-800">{p.description}</div>
                    <div className="text-[10px] text-gray-400">ID: INV-{p.id}00923</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{p.dueDate}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800 text-right">${p.amount.toFixed(2)}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                      {p.status === 'Paid' ? 'Download' : 'Pay Now'}
                    </button>
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

export default Payments;
