import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyledPersonalBrandLogo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;

}
`;

const PersonalBrandLogo = () => (
  <StyledPersonalBrandLogo>
    <StaticImage
      className="img"
      src="../images/logo.png"
      quality={100}
      formats={['AUTO', 'WEBP', 'AVIF']}
      alt="logo"
      placeholder="blurred"
      layout="fixed"
      width={150}
    />
  </StyledPersonalBrandLogo>
);

export default PersonalBrandLogo;
