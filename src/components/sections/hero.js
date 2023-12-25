import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
${({ theme }) => theme.mixins.flexCenter};
  padding: 0;
  margin-top: -70px;
  flex-direction: row;
  justify-content: flex-start;
  gap: 100px;
  min-height: 100vh;
  height: 100vh;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
  }

  .hero-photo {
    display: block;
    position: relative;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition: var(--transition);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(50%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }

  .hero-details {
    h1 {
      margin: 0 0 30px 4px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
      font-weight: 400;

      @media (max-width: 480px) {
        margin: 0 0 20px 2px;
      }
    }

    h2 {
      font-size: clamp(40px, 8vw, 80px);
    }

    h3 {
      margin-top: 5px;
      color: var(--slate);
      line-height: 0.9;
      font-size: clamp(25px, 5vw, 50px);
      font-family:  'Polo', 'Stasiun', 'flottflott', 'Sivar Pro', 'Edu TAS Beginner', sans-serif !important;
    }

    .see-projects-button {
      margin: 30px 0 0 4px;
      ${({ theme }) => theme.mixins.bigButton};
      font-size: var(--fz-xs);
    }
  }
`;

const Hero = () => {
  const Greeting = <h1>Hi, my name is</h1>;
  const Name = <h2 className="page-title">Daniel Oropeza</h2>;
  const Profession = <h3>Full-stack Software Engineer</h3>;
  const SeeMyProjectsButton = <Link className='see-projects-button' to="/projects">See my projects</Link>;

  const heroItems = [Greeting, Name, Profession, SeeMyProjectsButton];

  return (
    <StyledHeroSection>
      <div className="hero-details">
        {heroItems.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
      <div className="hero-photo">
        <StaticImage
          className="img"
          src="../../images/me.jpg"
          quality={100}
          aspectRatio={1}
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Daniel Oropeza"
          placeholder="blurred"
          layout="fixed"
          width={325}
          height={325}
        />
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
