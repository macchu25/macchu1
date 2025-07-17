import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import LanguageSwitcher from "./LanguageSwitcher";
import SettingsDrawer from "./SettingsDrawer";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary" : "bg-transparent"
      } ${styles.paddingX} py-3 sm:py-5`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-2 sm:px-0'>
        <Link
          to='/'
          className='flex items-center gap-2 min-w-0'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-8 h-8 sm:w-9 sm:h-9 object-contain' />
          <p className='text-white text-[16px] sm:text-[18px] font-bold cursor-pointer flex whitespace-nowrap overflow-hidden text-ellipsis'>
            Macchu &nbsp;
            <span className='hidden sm:block'>| JavaScript Mastery</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6 md:gap-10 items-center ml-auto'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[16px] md:text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li>
            <button
              className={`${
                active === 'Setting' ? "text-white" : "text-secondary"
              } hover:text-white text-[16px] md:text-[18px] font-medium cursor-pointer bg-transparent border-none outline-none`}
              style={{padding: 0, margin: 0}}
              onClick={() => setSettingsOpen(prev => !prev)}
            >
              Setting
            </button>
          </li>
        </ul>
        <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-7 h-7 object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-4 w-full black-gradient absolute top-16 left-0 right-0 my-2 z-30 rounded-xl shadow-lg transition-all duration-300`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[15px] sm:text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li>
                <button
                  className={`font-poppins font-medium cursor-pointer text-[15px] sm:text-[16px] ${active === 'Setting' ? "text-white" : "text-secondary"} hover:text-white bg-transparent border-none outline-none`}
                  style={{padding: 0, margin: 0}}
                  onClick={() => {
                    setSettingsOpen(prev => !prev);
                    setToggle(false);
                  }}
                >
                  Setting
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
