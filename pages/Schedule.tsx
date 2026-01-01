
import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const ScheduleBlock = ({ 
  time, 
  subject, 
  colorClasses 
}: { 
  time: string, 
  subject: string, 
  colorClasses: string 
}) => (
  <div className={`ml-20 mr-4 mb-4 p-4 lg:p-6 rounded-2xl border ${colorClasses} animate-in fade-in slide-in-from-left-4 duration-500`}>
    <p className="text-[10px] font-bold opacity-70 mb-1 uppercase">{time}</p>
    <p className="text-[14px] lg:text-[15px] font-black">{subject}</p>
  </div>
);

const Schedule: React.FC = () => {
  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-6 lg:space-y-8">
      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        
        {/* Main Schedule Area */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm relative">
          <div className="flex justify-between items-start mb-12">
            <h1 className="text-xl font-black text-[#1e293b]">Class Schedule</h1>
            <div className="flex items-center space-x-6">
              <span className="text-[12px] font-bold text-gray-400">Sunday Aug 18</span>
              <div className="relative">
                <select className="bg-[#f8fafc] border border-gray-100 text-[10px] font-black rounded-lg pl-3 pr-10 py-2.5 text-gray-500 uppercase appearance-none cursor-pointer">
                  <option>Today</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={12} />
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Time Labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2 text-[11px] font-black text-gray-300 uppercase h-[600px]">
              <div>8:00 AM</div>
              <div>9:00 AM</div>
              <div>10:00 AM</div>
              <div>11:00 AM</div>
              <div>12:00 PM</div>
              <div>1:00 PM</div>
              <div>2:00 PM</div>
              <div>3:00 PM</div>
            </div>

            {/* Grid Lines */}
            <div className="absolute left-16 right-0 top-0 h-[600px] flex flex-col justify-between py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border-b border-gray-50 w-full h-px"></div>
              ))}
            </div>

            {/* Schedule Items */}
            <div className="relative h-[600px] pt-2">
              <ScheduleBlock 
                time="8:00 AM - 8:45 AM" 
                subject="Math" 
                colorClasses="bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]" 
              />
              <ScheduleBlock 
                time="9:00 AM - 9:45 AM" 
                subject="English" 
                colorClasses="bg-[#fef9c3] border-[#fef08a] text-[#a16207]" 
              />
              <ScheduleBlock 
                time="10:00 AM - 10:45 AM" 
                subject="Biology" 
                colorClasses="bg-[#f3e8ff] border-[#e9d5ff] text-[#7e22ce]" 
              />
              <ScheduleBlock 
                time="11:00 AM - 11:45 AM" 
                subject="Physics" 
                colorClasses="bg-[#fdf2f8] border-[#fce7f3] text-[#be185d]" 
              />
              <div className="h-10"></div> {/* Gap for lunch? */}
              <ScheduleBlock 
                time="1:00 PM - 1:45 PM" 
                subject="Chemistry" 
                colorClasses="bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]" 
              />
              <ScheduleBlock 
                time="2:00 PM - 2:45 PM" 
                subject="History" 
                colorClasses="bg-[#fef9c3] border-[#fef08a] text-[#a16207]" 
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6 lg:space-y-10">
          
          {/* Calendar Widget */}
          <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 border border-gray-100 shadow-sm overflow-hidden">
            <h2 className="text-sm font-black text-[#1e293b] mb-6">Calendar</h2>
            <div className="flex items-center justify-between mb-6">
              <ChevronLeft className="text-gray-300 hover:text-blue-500 cursor-pointer" size={18} />
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">August 2024</span>
              <ChevronRight className="text-gray-300 hover:text-blue-500 cursor-pointer" size={18} />
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <span key={day} className="text-[9px] font-black text-gray-300">{day}</span>
              ))}
              {[...Array(31)].map((_, i) => (
                <div 
                  key={i} 
                  className={`text-[11px] font-bold py-1.5 cursor-pointer transition-all rounded-lg ${
                    i + 1 === 18 
                      ? 'bg-[#e0f2fe] text-[#0ea5e9]' 
                      : 'text-gray-400 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Events Widget */}
          <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black text-[#1e293b]">Events</h2>
              <MoreHorizontal size={16} className="text-gray-300" />
            </div>
            <div className="space-y-5">
              {[
                { title: 'Summer Camp Trip', time: '12:00PM - 2:00PM', desc: 'Outdoor activities and games for all students.', active: false },
                { title: 'Music Concert', time: '12:00PM - 3:00PM', desc: 'Classic music concert for all students and teachers.', active: false },
                { title: 'Science Fair', time: '2:00PM - 4:00PM', desc: 'Traditional science festival for all students.', active: true },
              ].map((event, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    event.active 
                      ? 'bg-white border-[#fef08a] shadow-md shadow-yellow-50' 
                      : 'bg-white border-transparent hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[12px] font-black text-[#1e293b]">{event.title}</h3>
                    <span className="text-[9px] font-bold text-gray-300 uppercase">{event.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Widget */}
          <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black text-[#1e293b]">Announcements</h2>
              <button className="text-[10px] font-black text-gray-300 hover:text-blue-500 uppercase">View More</button>
            </div>
            <div className="space-y-4">
              <div className="bg-[#f0f9ff] p-4 rounded-2xl border border-[#e0f2fe]">
                <h3 className="text-[12px] font-black text-[#1e293b] mb-1">About Mth 110 Test</h3>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">The Math test scheduled for 2nd January has been cancelled. A new date will be announced soon.</p>
              </div>
              <div className="bg-[#f5f3ff] p-4 rounded-2xl border border-[#ede9fe]">
                <h3 className="text-[12px] font-black text-[#1e293b] mb-1">Field Trip Rescheduled</h3>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">The field trip to London has been rescheduled. Please check back for the new date and further instructions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
