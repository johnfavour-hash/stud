import React, { useState } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-['Inter']">
      {/* Left Side - Modern Campus Image */}
      <div className="hidden lg:block lg:w-[65%] relative">
        <img 
          src="/assets/54edd5a52523c71877ec8fcec5d76c0ac0adf1f5.png" 
          alt="Modern University Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[35%] flex items-center justify-center p-6 bg-[#f8fafc] lg:bg-white">
        {/* Login Card */}
        <div className="w-full max-w-md bg-[#f9fbff] lg:bg-[#f9fbff] p-8 lg:p-12 rounded-[48px] border border-[#e2e8f0]/60 shadow-xl shadow-blue-50/20 lg:shadow-2xl lg:shadow-blue-50/40 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <img 
              src="/assets/spedox.jpg" 
              alt="Logo" 
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-[#1e293b] mb-2">Login</h1>
            <p className="text-[14px] font-medium text-gray-400">Welcome back please login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Enter Username" 
                className="w-full bg-white border border-gray-200 rounded-[22px] py-4.5 px-7 text-[15px] font-medium text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-[#1d76d2] transition-all placeholder:text-gray-300 shadow-sm"
              />
              <User className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1d76d2] transition-colors" size={20} strokeWidth={2.5} />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                className="w-full bg-white border border-gray-200 rounded-[22px] py-4.5 px-7 text-[15px] font-medium text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-[#1d76d2] transition-all placeholder:text-gray-300 shadow-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1d76d2] transition-colors"
              >
                {showPassword ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
              </button>
            </div>

            {/* Toggle Section */}
            <div className="flex items-center space-x-3 px-2">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`relative w-[48px] h-[24px] rounded-full transition-colors duration-300 focus:outline-none ${rememberMe ? 'bg-[#3b82f6]/20' : 'bg-gray-100'}`}
              >
                <div className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] rounded-full transition-all duration-300 transform ${rememberMe ? 'translate-x-[24px] bg-[#1d76d2] shadow-md shadow-blue-200' : 'translate-x-0 bg-white shadow-sm'}`}></div>
              </button>
              <span className="text-[13px] font-bold text-gray-400">Remember me</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#1d76d2] hover:bg-[#1565c0] text-white py-5 rounded-[22px] text-[16px] font-black shadow-xl shadow-blue-200/50 transition-all transform active:scale-[0.98] mt-6"
            >
              Login
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-10 text-center">
            <p className="text-[13px] font-bold text-gray-400">
              Forgot Password? <button type="button" className="text-[#3b82f6] hover:text-[#1d76d2] hover:underline transition-colors">Click Here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
