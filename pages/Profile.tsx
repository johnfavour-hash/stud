import React, { useState } from 'react';
import { Save, Mail, Phone, User, MapPin } from 'lucide-react';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'Grace',
    lastName: 'Hopkins',
    email: 'grace@uniedu.com',
    phone: '+234 (123) 456-7890',
    matNumber: 'CSC/2021/001',
    address: '123 University Street, Lagos',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1000px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-2">Profile Settings</h1>
        <p className="text-sm text-gray-400">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-10 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-[#00679A] flex items-center justify-center text-white shadow-md">
            <User size={48} />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl lg:text-2xl font-bold text-[#1e293b]">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{formData.matNumber}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-[13px] font-bold text-[#1e293b]">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-[#1e293b] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-[13px] font-bold text-[#1e293b]">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-[#1e293b] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="text-[13px] font-bold text-[#1e293b] flex items-center space-x-2">
                <Mail size={14} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-[#1e293b] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="text-[13px] font-bold text-[#1e293b] flex items-center space-x-2">
                <Phone size={14} />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-[#1e293b] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Matric Number */}
            <div className="flex flex-col space-y-2">
              <label className="text-[13px] font-bold text-[#1e293b]">Matric Number</label>
              <input
                type="text"
                value={formData.matNumber}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-400 cursor-not-allowed focus:outline-none"
              />
              <p className="text-[11px] text-gray-400">Cannot be changed</p>
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-[13px] font-bold text-[#1e293b] flex items-center space-x-2">
                <MapPin size={14} />
                <span>Address</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-[#1e293b] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 sm:flex-none bg-[#3b82f6] text-white px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none bg-[#22c55e] text-white px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-green-600 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-none bg-white border border-gray-200 text-[#1e293b] px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-[#f0fdf4] border border-[#22c55e] rounded-[24px] p-6 lg:p-8">
        <h3 className="text-[14px] font-bold text-[#22c55e] mb-2">Profile Updated</h3>
        <p className="text-[13px] text-gray-600">
          Your profile information is securely stored and used only for official university communications.
        </p>
      </div>
    </div>
  );
};

export default Profile;
