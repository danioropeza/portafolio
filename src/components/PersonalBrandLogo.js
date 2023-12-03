import React from 'react';
import styled from 'styled-components';
import { IconPersonalBrand } from '@components/icons';

const StyledPersonalBrandLogo = styled.div`
  color: var(--green);
  width: 100%;
  height: 100px;
}
`;

const PersonalBrandLogo = () => (
  <StyledPersonalBrandLogo>
    <IconPersonalBrand />
  </StyledPersonalBrandLogo>
);

export default PersonalBrandLogo;
