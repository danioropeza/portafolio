/* eslint-disable react/jsx-key */
import React, { useEffect, useRef } from 'react';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { Hero } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const AboutMePage = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealSections = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    revealSections.current.forEach((ref, i) => {
      scrollReveal.reveal(ref, srConfig(i * 200));
    });
  }, []);

  const sections = [
    <Hero />,
  ];

  return (
    <div className={prefersReducedMotion ? '' : 'load-hidden'}>
      {sections.length > 0 && sections.map((section, i) => (
        <div key={i} ref={el => (revealSections.current[i] = el)}>
          {section}
        </div>
      ))}
    </div>
  );
};

export default AboutMePage;
