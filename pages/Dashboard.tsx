import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Clock } from 'lucide-react';

const performanceData = [
  { name: 'Yr 1', value: 50 },
  { name: 'Yr 2', value: 25 },
  { name: 'Yr 3', value: 72 },
  { name: 'Yr 4', value: 80 },
  { name: 'Yr 5', value: 30 },
  { name: 'Yr 6', value: 70 },
];

const StatusBadge = ({ label, value }: { label: string, value: string }) => {
  const getBadgeStyle = (val: string) => {
    if (val === 'Not Done' || val === 'Not Paid' || val === 'Not Applicable') return 'bg-[#fff1f2] text-[#f43f5e]';
    if (val === 'Completed' || val === 'None') return 'bg-[#f0fdf4] text-[#22c55e]';
    return 'bg-[#f8fafc] text-[#94a3b8]';
  };

  return (
    <div className="flex flex-col">
      <p className="text-[12px] lg:text-[13px] font-bold text-[#1e293b] mb-2">{label}</p>
      <div className="flex">
        <span className={`px-3 lg:px-4 py-1.5 rounded-lg text-[10px] font-bold ${getBadgeStyle(value)}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 max-w-[1920px] mx-auto space-y-8 font-sans text-slate-800">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area (Left 2/3) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-blue-500 rounded-[32px] p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-center min-h-[280px] shadow-lg shadow-blue-200/50">
            <div className="relative z-10 max-w-xl">
              <h1 className="text-3xl lg:text-5xl font-bold mb-3 tracking-tight">Hello Grace,</h1>
              <p className="text-blue-100 text-lg lg:text-xl mb-8 font-medium">Welcome back</p>
              
              <div className="space-y-1 mb-8">
                <p className="text-white/95 text-base lg:text-lg font-medium leading-snug">
                  You have pending payments to make.
                </p>
                <p className="text-white/95 text-base lg:text-lg font-medium leading-snug">
                  Let's get it done!
                </p>
              </div>
              
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all shadow-md active:scale-95">
                Review now!
              </button>
            </div>
            
            {/* Decorative Image */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-[120%] w-1/2 pointer-events-none flex items-center justify-center">
               <img 
                src="/assets/60664c15bdd0a28d19bcb5d0502ee7e0aec005d3 (1).png" 
                alt="Welcome Illustration" 
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Academic Performance Chart */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-800">Academic Performance</h2>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg pl-4 pr-10 py-2.5 text-slate-600 outline-none hover:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                  <option>All Time</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="h-72 w-full" style={{ minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    dy={15} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    domain={[0, 100]} 
                    ticks={[0, 25, 50, 75, 100]} 
                  />
                  <Tooltip 
                    cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#22c55e" 
                    strokeWidth={4} 
                    dot={{ r: 0 }} 
                    activeDot={{ r: 8, fill: '#22c55e', stroke: '#fff', strokeWidth: 4, shadowBlur: 10 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Tab Grid */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Status Tab</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <StatusBadge label="Courses Registration Status" value="Not Done" />
              <StatusBadge label="Transcript Application Status" value="Not Applicable" />
              <StatusBadge label="School Fee Payment Status" value="Completed" />
              <StatusBadge label="Department Fee Payment Status" value="Not Paid" />
              <StatusBadge label="Complaint Status" value="None" />
              <StatusBadge label="Complaint Status" value="None" />
            </div>
          </div>
        </div>

        {/* Right Content Column (Right 1/3) */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Calendar Section */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-800">Calendar</h2>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg pl-3 pr-8 py-2 text-slate-600 outline-none hover:border-blue-300 transition-all cursor-pointer">
                  <option>Today</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Active Item */}
              <div className="bg-blue-500 p-6 rounded-[20px] text-white shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="font-bold text-base mb-2">Electronic Engineering</h3>
                <div className="flex items-center text-xs font-medium opacity-90">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">CSC 201.1</span>
                  <div className="w-px h-3 bg-white/30 mx-3"></div>
                  <Clock size={14} className="mr-1.5" />
                  <span>10:00 - 12:00pm</span>
                </div>
              </div>
              
              {/* Other Items */}
              {[
                { name: 'Computer Science', code: 'CSC 200.1', time: '12:00 - 1:00pm' },
                { name: 'General Studies', code: 'GES 200.1', time: '12:00 - 1:00pm' },
                { name: 'Computer Science', code: 'CSC 200.1', time: '12:00 - 1:00pm' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-[20px] border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all cursor-pointer group">
                  <h3 className="font-bold text-sm text-slate-700 mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <div className="flex items-center text-xs font-bold text-slate-400">
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-500">{item.code}</span>
                    <div className="w-px h-3 bg-slate-300 mx-3"></div>
                    <Clock size={14} className="mr-1.5" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Bio Section */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden h-fit">
            <div className="absolute right-8 top-10 w-12 h-1.5 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute right-8 top-10 w-8 h-1.5 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800 mb-8">Student Bio</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              {[
                { label: 'First name', value: 'Grace' },
                { label: 'Last name', value: 'Hopkins' },
                { label: 'Email', value: 'grace@uniedu.com', full: true },
                { label: 'Phone Number', value: '+234 701 345 3421', full: true },
                { label: 'Department', value: 'Computer Science' },
                { label: 'Faculty', value: 'Sciences' },
                { label: 'Level', value: '200' },
                { label: 'Semester', value: 'First' },
                { label: 'Matric. Number', value: 'U2024/3065002' },
                { label: 'Program', value: 'Undergraduate' },
              ].map((item, idx) => (
                <div key={idx} className={`${item.full ? 'col-span-1 sm:col-span-2' : ''} group`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-hover:text-blue-500 transition-colors">{item.label}</p>
                  <p className="text-sm font-bold text-slate-700 truncate select-all" title={item.value}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
