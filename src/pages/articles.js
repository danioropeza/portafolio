import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const ArticlesPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <p>Bienvenido a la página de ARTICULOS</p>
    </StyledMainContainer>
  </Layout>
);

ArticlesPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArticlesPage;
