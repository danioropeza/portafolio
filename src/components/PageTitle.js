import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { usePrefersReducedMotion } from '@hooks';

const StyledPageTitle = styled.div`
  margin-bottom: 100px;
`;

const PageTitle = ({ title, subtitle }) => {
  const revealTitle = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    scrollReveal.reveal(revealTitle.current, srConfig());
  }, []);
  return (
    <StyledPageTitle>
      <Helmet title={title} />

      <header ref={revealTitle}>
        <h1 className="big-heading">{title}</h1>
        <p className="subtitle">
          {subtitle}
        </p>
      </header>
    </StyledPageTitle>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageTitle;
