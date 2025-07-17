import { BrowserRouter } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas } from "./components";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import SettingsDrawer from "./components/SettingsDrawer";

const App = () => {
  const [musicVolume, setMusicVolume] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/song.mp3');
      audioRef.current.loop = true;
      audioRef.current.play();
    }
    audioRef.current.volume = musicVolume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicVolume]);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
          <Hero />
        </div>
        <About />
        <Experience />
   
        <Tech />
        
        <div className="px-6 md:px-20 py-10">
          <Projects />
        </div>
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>
      <ChatBot />
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        musicVolume={musicVolume}
        setMusicVolume={setMusicVolume}
      />
    </BrowserRouter>
  );
}

export default App;
