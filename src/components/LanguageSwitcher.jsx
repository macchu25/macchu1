import React, { useState, useRef, useEffect } from "react";
import i18n from "../i18n";
import { MdLanguage } from "react-icons/md";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const current = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#23263a] transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <MdLanguage className="text-xl" />
        <span className="text-lg">{current.flag}</span>
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-[#23263a] text-white rounded shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-[#35395c] transition-colors flex items-center gap-2 ${i18n.language === lang.code ? 'font-bold' : ''}`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 