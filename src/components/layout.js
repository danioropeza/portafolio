import React, { useState, useEffect } from 'react';
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
  // This is for fixing production console errors related with hydratation. 
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  return (
    <>
    {domLoaded && (
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
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
