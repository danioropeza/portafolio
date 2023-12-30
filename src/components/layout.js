import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Header, Sidebar, Navbar } from '@components';
import { GlobalStyle, theme } from '@styles';

const Layout = ({ children }) => {
  const IS_MOBILE_QUERY = '(max-width: 1080px)';
  const isMobile = window.matchMedia(IS_MOBILE_QUERY).matches;
  
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
          {isMobile ? <Navbar /> : <Header />}
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
