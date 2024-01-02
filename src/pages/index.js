/* eslint-disable react/jsx-key */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled, { css }  from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { Icon } from '@components/icons';
import { Hero, WorkExperience, PersonalInformation } from '@components';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';

const StyledDownArrow = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  right: auto;
  z-index: 100;
  animation-duration: 1s;
  animation-name: moveArrow;
  animation-iteration-count: infinite;
  transition: var(--transition);
  animation-direction: alternate;


  svg {
    height: 20px;
    width: 20px;
    color: var(--green);
  }


  @keyframes moveArrow {
    from {
      transform: translateY(-12px);
    }

    to {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    ((props.scrollDirection === 'down') || (props.scrollDirection === 'up')) &&
      css`
        svg {
          display: none;
        }
      `};
  }
`;

const AboutMePage = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealSections = useRef([]);
  const scrollDirection = useScrollDirection('');

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
    <WorkExperience />,
    <PersonalInformation />,
  ];

  return (
    <>
      <Helmet title={'About Me'} />
      <div className={prefersReducedMotion ? '' : 'load-hidden'}>
        {sections.length > 0 && sections.map((section, i) => (
          <div key={i} ref={el => (revealSections.current[i] = el)}>
            {section}
          </div>
        ))}
      </div>
      <StyledDownArrow scrollDirection={scrollDirection}>
        <Icon name='DownArrowIndicator' />
      </StyledDownArrow>
    </>
  );
};

export default AboutMePage;

export const Head = () => (
  <SEO title="About me" description="This page shows all my work experiencia and personal information"/>
);
