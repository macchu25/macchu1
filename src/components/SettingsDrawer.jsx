import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MdLanguage } from "react-icons/md";

const SettingsDrawer = ({ open, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80  bg-[#181824] text-white shadow-2xl z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} rounded-l-2xl border-l-2 border-[#23263a]`}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
    >
      <div className="flex justify-between items-center p-6 border-b border-[#23263a]">
        <h2 className="text-2xl font-extrabold tracking-wide">Settings</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full w-10 h-10 flex items-center justify-center bg-[#23263a] hover:bg-[#35395c]">
          &times;
        </button>
      </div>
      <div className="p-8 flex flex-col gap-8 items-start">
        <div className="w-full flex flex-col items-start text-left">
          <h3 className="font-semibold mb-4 text-lg tracking-wide flex items-center gap-2">
            <MdLanguage className="text-xl" />
            Language
          </h3>
          <LanguageSwitcher />
        </div>
        {/* Có thể thêm các cài đặt khác ở đây */}
      </div>
    </div>
  );
};

export default SettingsDrawer; 