import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const ProjectsPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <p>Bienvenido a la página de PROYECTOS</p>
    </StyledMainContainer>
  </Layout>
);

ProjectsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ProjectsPage;
