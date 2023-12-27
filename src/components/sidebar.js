import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { routes } from '@config';
import { Link } from 'gatsby';
import { loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';
import { Footer, PersonalBrandLogo } from '@components';
import contentBackground from '../images/wall.jpeg';
import sidebarBackground from '../images/increased-wall.jpeg';

const SidebarMenu = styled.div`
  position: fixed;
  z-index: 12;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-image: url(${sidebarBackground});
  height: 100vh;
  overflow: hidden;
  border-right: 1px solid var(--green);
  box-shadow:
      0 0 2px var(--white),
      0 0 8px var(--white),
      0 0 24px var(--green);
      0 0 32px var(--green);
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
`;

const SidebarMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const NavigationLinks = styled.div`
  ol {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const NavigationButton = styled(Link)`
  color: var(--slate);
  width: var(--sidebar-width);
  background-color: transparent;
  border: 1px solid var(--green);
  box-shadow:
      0 0 2px var(--white),
      0 0 10px var(--green);
  border-right: none;
  border-left: none;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;

  .navigation-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: var(--transition);

    svg {
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }
  }

  &.active,
  &:hover,
  &:focus-visible {
    color: var(--white);
    text-shadow:
      0 0 7px var(--white),
      0 0 21px var(--white),
      0 0 42px var(--green),
      0 0 82px var(--green),
      0 0 151px var(--green);
    outline: none;

    .navigation-content {
      transform: translate(10px);
    }
  }
  &:after {
    display: none !important;
  }
`;

const SidebarContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 90px 50px 100px 340px;
  background-image: url(${contentBackground});
`;

const Sidebar = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const fadeClass = 'fade';
  const timeout = loaderDelay;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuList>
          <PersonalBrandLogo />
          <NavigationLinks>
            <ol>
              {prefersReducedMotion ? (
                <>
                  {routes &&
                    routes.map((route, i) => (
                      <li key={i}>
                        <NavigationButton activeClassName="active" to={route.to}>
                          <div className="navigation-content">
                            <Icon name={route.iconName} />
                            {route.title}
                          </div>
                        </NavigationButton>
                      </li>
                    ))}
                </>
              ) : (
                <>
                  <TransitionGroup component={null}>
                    {isMounted &&
                      routes &&
                      routes.map((route, i) => (
                        <CSSTransition key={i} classNames={fadeClass} timeout={timeout}>
                          <li key={i} style={{ transitionDelay: `${i * 100}ms` }}>
                            <NavigationButton activeClassName="active" to={route.to}>
                              <div className="navigation-content">
                                <Icon name={route.iconName} />
                                {route.title}
                              </div>
                            </NavigationButton>
                          </li>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </>
              )}
            </ol>
          </NavigationLinks>
          <Footer />
        </SidebarMenuList>
      </SidebarMenu>
      <SidebarContent>{children}</SidebarContent>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
