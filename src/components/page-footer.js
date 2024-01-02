import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins?.flexCenter};
  flex-direction: column;
  height: auto;
  text-align: center;
  color: var(--light-slate);
  font-family: var(--font-mono);
  line-height: 1;
  font-size: var(--fz-xxs);

  @media (max-width: 1080px) {
    padding-top: 20px;
    font-size: var(--fz-xxxs);
  }
`;

const PageFooter = () => <StyledFooter>Code built with React, Gatsby &amp; Styled Components. Deployed with Netlify.</StyledFooter>;

export default PageFooter;
