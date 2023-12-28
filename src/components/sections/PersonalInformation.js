import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { KEY_CODES } from '@utils';

const StyledPersonalInformationSection = styled.section`
  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins?.link};
  display: flex;
  align-items: center;
  width: 130px;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--green);
  background-color: ${({ isActive }) => (isActive ? 'var(--light-black)' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins?.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--green);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-black);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  .description {
    font-size: var(--fz-md);
  }

  .merits {
    ${({ theme }) => theme.mixins?.starList};
    font-size: var(--fz-md);
  }

  .languages {

    .title {
      margin-bottom: 10px;
      color: var(--lightest-slate);

      .details {
        margin-left: 10px;
        color: var(--slate);
        font-size: var(--fz-md);
      }

      .level-container {
        position: relative;
        vertical-align: middle;
        margin-left: 10px;
        display: inline-block;
        border-radius: var(--border-radius);
        width: 200px;
        height: 20px;
        border: 1px solid var(--green);

        .spanish-level {
          background: var(--green);
          width: 200px;
          z-index: 10;
          height: 19px;
          position: absolute;
          border-radius: 3px;
        }
        .english-level {
          background: var(--green);
          width: 135px;
          z-index: 10;
          height: 19px;
          position: absolute;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
      }
    }
  }

  .education {
    font-size: var(--fz-md);
    .range {
      margin-bottom: 25px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }
  }

  .highlight {
    color: var(--green);
  }
`;

const PersonalInformation = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);


  const personalInformation = [
    {
      title: 'Description',
      content: (
        <div className='description'>
          <p>
            Full-Stack Software Engineer with <span className='highlight'>4+ years of experience</span> in the market, mostly focusing on <span className='highlight'>Web and Hybrid</span>. Currently working in the field
            of contact center software as a service that helps agents connect with their customers through our globally known platform.
          </p>
          <p>I am passionate about <span className='highlight'>creating code and that it generates an impact of value in people's lives</span>. The technology is building the future.</p>
          <p>
            During my career, I have had the opportunity to <span className='highlight'>work with complex systems </span>maintained by more than 70+ teams which allowed me to have
            a <span className='highlight'>broader vision of software development for large applications</span>. My passion for technology has driven me to work with people of diverse nationalities and
            cultures, providing me with valuable experience in cross-cultural communication and collaboration. I am a <span className='highlight'>person who likes to do things in the
            best possible way</span>. I have a big  desire to contribute and expand my software engineering career by <span className='highlight'>pursuing challenging projects to overcome my
            own limits</span>. My ability to adapt to different work environments has allowed me to gain remote work experience, making me a versatile team member.
          </p>
        </div>
      ),
    },
    {
      title: 'Education',
      content: (
        <div className='education'>
          <h3>
            <span>Systems Engineering</span>
          </h3>
          <p>Bachelor of Science</p>
          <p><a href="https://cba.ucb.edu.bo/" className="inline-link">Universidad Católica Boliviana “San Pablo”</a></p>
          <p className="range">2016 - 2020 | Cochabamba, Bolivia</p>
        </div>
      ),
    },
    {
      title: 'Merits',
      content: (
        <ul className='merits'>
          <li>Two times <span className='highlight'>academic excellence award </span>for obtaining the highest average in the previous semester among all (300+) systems engineering students.</li>
          <li><span className='highlight'>Maximum score</span> in the University’s <span className='highlight'>Final Project.</span> Graduated as distinguished with <span className='highlight'>honors.</span></li>
          <li>Three times <span className='highlight'>teaching assistant</span> in my university. Two for <span className='highlight'>Data Structures and Algorithms</span> and one for <span className='highlight'>Introduction to Programming.</span></li>
        </ul>
      ),
    },
    {
      title: 'Languages',
      content: (
        <div className='languages'>
          <div className='title'>
            Spanish:
            <div className='level-container'>
              <div className='spanish-level'></div>
            </div>
            <span className='details'>Native</span>
          </div>
          <div className='title'>
            English: <div className='level-container'>
              <div className='english-level'></div>
            </div>
            <span className='details'>B2 Intermediate-High</span>
          </div>
        </div>
      ),
    },
  ];

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledPersonalInformationSection id="personal-information">
      <h2 className="section-heading">More About Me</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Personal Information tabs" onKeyDown={e => onKeyDown(e)}>
          {personalInformation &&
            personalInformation.map(({ title }, i) => (
              <StyledTabButton
                key={i}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? '0' : '-1'}
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}>
                <span>{title}</span>
              </StyledTabButton>
            ))}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {personalInformation &&
            personalInformation.map(({ content }, i) => (
              <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}>
                  {content}
                </StyledTabPanel>
              </CSSTransition>
            ))}
        </StyledTabPanels>
      </div>
    </StyledPersonalInformationSection>
  );
};

export default PersonalInformation;
