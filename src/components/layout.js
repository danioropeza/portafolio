import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Header, Sidebar, Navbar } from '@components';
import { GlobalStyle, theme } from '@styles';


const Headers = styled.div`
  .navbar {
    @media (min-width: 1080px) {
      display: none;
    }
  }

  .header {
    @media (max-width: 1080px) {
      display: none;
    }
  }
`;

const Layout = ({ children }) => {
  // Sets target="_blank" rel="noopener noreferrer" on external links
  /*const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };*/

  useEffect(() => {
    /*if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }*/

    //handleExternalLinks();
  }, []);

  return (
    <>
      {/*<Head />*/}

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Headers>
            <div className='navbar'>
              <Navbar />
            </div>
            <div className='header'>
              <Header/>
            </div>
          </Headers>
          <Sidebar>{children}</Sidebar>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
