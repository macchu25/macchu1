import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { t } = useTranslation();
  const [isStacked, setIsStacked] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);


  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('about.intro')}</p>
        <h2 className={styles.sectionHeadText}>{t('about.overview')}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {t('about.description')}
      </motion.p>

      {/* Mobile: Stacked cards */}
      <div className='block sm:hidden mt-10'>
        {isStacked ? (
          <div key={`stacked-${forceUpdate}`} className='relative h-[350px] w-full flex justify-center items-center'>
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500`}
                style={{
                  zIndex: services.length - idx,
                  top: `${idx * 10}px`,
                  filter: idx === 0 ? 'none' : 'blur(1.5px)',
                  opacity: idx === 0 ? 1 : 0.7,
                  pointerEvents: idx === 0 ? 'auto' : 'none',
                  width: '90vw',
                  maxWidth: 320,
                }}
              >
                <ServiceCard index={idx} {...service} />
              </div>
            ))}
            <button
              className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-lg shadow-md mt-4'
              onClick={() => setIsStacked(false)}
            >
              {t('about.more')}
            </button>
          </div>
        ) : (
          <div key="spread" className='w-full flex flex-col items-center gap-4'>
            {services.map((service, idx) => (
              <Tilt className='xs:w-[250px] w-full' key={service.title}>
                <div className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
                  <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
                    <img src={service.icon} alt={service.title} className='w-16 h-16 object-contain' />
                    <h3 className='text-white text-[20px] font-bold text-center'>{service.title}</h3>
                  </div>
                </div>
              </Tilt>
            ))}
      
          </div>
        )}
      </div>

      {/* Tablet/Desktop: Grid layout như cũ */}
      <div className='hidden sm:grid mt-10 sm:mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 justify-items-center sm:justify-items-stretch'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
