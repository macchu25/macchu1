import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MdLanguage, MdMusicNote } from "react-icons/md";

const SettingsDrawer = ({ open, onClose, musicVolume, setMusicVolume }) => {
  const [showVolume, setShowVolume] = useState(false);
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
      <div className="p-4 flex flex-col gap-5 items-start  ">
        <div className="w-full flex flex-col items-start text-left">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#23263a] transition-colors text-2xl font-extrabold"
            style={{ cursor: "default" }}
            disabled
          >
        
          </button>
          <LanguageSwitcher />
        </div>
        {/* Music Controls */}
        <div className="w-full flex flex-col items-start text-left ">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#23263a] transition-colors text-2xl font-extrabold focus:outline-none"
            style={{ cursor: "pointer" }}
            onClick={() => setShowVolume(v => !v)}
          >
            <MdMusicNote className="text-2xl" />
            <h3 className="font-extrabold flex items-center gap-2">Music</h3>
      
          </button>
          {showVolume && (
            <label className="flex items-center gap-3 w-full mt-3">
              <span className="text-base">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={musicVolume}
                onChange={e => setMusicVolume(Number(e.target.value))}
                className="w-32 accent-blue-500"
              />
              <span className="text-base w-8 text-right">{Math.round(musicVolume * 100)}</span>
            </label>
          )}
        </div>
        {/* Có thể thêm các cài đặt khác ở đây */}
      </div>
    </div>
  );
};

export default SettingsDrawer; 