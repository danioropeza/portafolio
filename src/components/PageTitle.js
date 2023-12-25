import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { usePrefersReducedMotion } from '@hooks';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';

const StyledPageTitle = styled.div`
  margin-bottom: 100px;
`;

const PageTitle = ({ title, subtitle }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealTitle = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    scrollReveal.reveal(revealTitle.current, srConfig());
  }, []);

  return (
    <StyledPageTitle>
      <Helmet title={title} />

      <header ref={revealTitle} className={prefersReducedMotion ? '' : 'load-hidden'}>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">
          {subtitle}
        </p>
      </header>
    </StyledPageTitle>
  );
}
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageTitle;
