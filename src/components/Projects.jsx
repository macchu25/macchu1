import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import { myProjects } from '../constants/myProjects.js';
import CanvasLoader from './Loading.jsx';
import DemoComputer from './DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const { t } = useTranslation();

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-10 sm:my-20 px-2 sm:px-0">
      <p className="head-text" style={{ color: "#fff", fontWeight: 700, fontSize: "1.5rem", lineHeight: '2rem' }}>
        My Selected Work
      </p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-8 sm:mt-12 gap-4 sm:gap-5 w-full">
        <div className="flex flex-col gap-4 sm:gap-5 relative sm:p-10 py-6 px-3 sm:py-10 sm:px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0 w-full h-40 sm:h-96">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-full object-cover rounded-xl" />
          </div>

          <div className="p-2 sm:p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-8 h-8 sm:w-10 sm:h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-3 sm:gap-5 text-white-600 my-3 sm:my-5">
            <p className="text-white text-lg sm:text-2xl font-semibold animatedText">{t(currentProject.title)}</p>
            <p className="animatedText text-sm sm:text-base">{t(currentProject.desc)}</p>
            <p className="animatedText text-sm sm:text-base">{t(currentProject.subdesc)}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-5">
            <div className="flex items-center gap-2 sm:gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600 text-xs sm:text-base"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>{t('projects.checkLiveSite', 'Check Live Site')}</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-5 sm:mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow"  className="w-4 h-4" />
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-60 xs:h-80 md:h-96 lg:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects; 