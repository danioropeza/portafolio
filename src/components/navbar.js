import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { routes } from '@config';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

const StyledNavbarWrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  filter: none !important;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.50);
  top: 0;
  z-index: 11;
  padding: 0px 32px 0px 27px;
  width: 100%;
  height: var(--nav-height);
  transition: var(--transition);
  border-bottom: 3px solid var(--green);
  justify-content: center;
`;

const StyledTopNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  color: var(--green);
  z-index: 15;

  .logo {
    svg {
      height: 50px;
      width: 50px;
    }
  }
  .hamburger {
    background-color: transparent;
    svg {
      height: 30px;
      width: 30px;
      stroke: var(--green);
    }
  }
`;

const StyledMenuList = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  z-index: 999;
  list-style: none;
`;

const NavigationLinks = styled.div`
  width: 100%;
  ol {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
`;

const NavigationButton = styled(Link)`
  color: var(--slate);
  width: 100%;
  border-top: 1px solid var(--green);
  border-bottom: 1px solid var(--green);
  border-right: none;
  border-left: none;
  box-shadow:
      0 0 2px var(--white),
      0 0 10px var(--green);
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  transition: var(--transition);

  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;

  .navigation-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }
  }

  &.active {
    color: var(--white);
    font-weight: bold;
    outline: none;

    svg {
      color: var(--green);
    }
  }
  &:after {
    display: none !important;
  }
`;


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  let { pathname } = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  if (pathname !== '/') {
    pathname = pathname.replace(/\/$/, '');
  }

  return (
    <>
      <StyledNavbarWrapper>
        <StyledTopNavbar>
          <div className='logo'>
            <Icon name='Logo' />
          </div>
          <button className='hamburger' onClick={toggleMenu}>
            <Icon name='Hamburger' />
          </button>
        </StyledTopNavbar>
        <StyledMenuList isOpen={isMenuOpen}>
          <NavigationLinks>
            {routes &&
                      routes.map((route, i) => (
                        <li key={i}>
                          <NavigationButton className={route.to === pathname ? 'active' : ''} activeClassName="active" to={route.to} onClick={toggleMenu}>
                            <div className="navigation-content">
                              <Icon name={route.iconName} />
                              {route.title}
                            </div>
                          </NavigationButton>
                        </li>
                      ))}
          </NavigationLinks>
        </StyledMenuList>
      </StyledNavbarWrapper>
    </>
  );
};

export default Navbar;
