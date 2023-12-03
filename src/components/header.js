import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { socialMedia } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledHeaderWrapper = styled.header`
  ${({ theme }) => theme.mixins.flexEnd};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledHeaderContent = styled.nav`
  ${({ theme }) => theme.mixins.flexEnd};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;
`;

const StyledSocialList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    a {
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-4px);
      }

      svg {
        width: 25px;
        height: 23px;
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timeout = loaderDelay;
  const fadeDownClass = 'fadedown';

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  return (
    <StyledHeaderWrapper scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledHeaderContent>
        {prefersReducedMotion ? (
          <>
            <StyledSocialList>
              {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                  <li key={i}>
                    <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                      <Icon name={name} />
                    </a>
                  </li>
                ))}

              <div>{ResumeLink}</div>
            </StyledSocialList>
          </>
        ) : (
          <>
            <StyledSocialList>
              <TransitionGroup component={null}>
                {isMounted &&
                  socialMedia &&
                  socialMedia.map(({ url, name }, i) => (
                    <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                      <li key={i} style={{ transitionDelay: `${i * 100}ms` }}>
                        <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                          <Icon name={name} />
                        </a>
                      </li>
                    </CSSTransition>
                  ))}
              </TransitionGroup>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${socialMedia.length * 100}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledSocialList>
          </>
        )}
      </StyledHeaderContent>
    </StyledHeaderWrapper>
  );
};

export default Header;
