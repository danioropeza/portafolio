import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { PageTitle, SEO } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const StyledProjectsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .projects-grid {
    ${({ theme }) => theme.mixins?.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(850px, 1fr));
    grid-gap: 50px;
    position: relative;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    }
    @media (max-width: 670px) {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  .project-content {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: transparent;
  }
`;

const StyledProjectCardGrid = styled.section`
  ${({ theme }) => theme.mixins?.resetList};
  display: grid;
  grid-template-columns: 60% 40%;

  @media (max-width: 1400px) {
    grid-template-columns: 100%;
  }
  grid-gap: 0px;
`;

const StyledProjectDetails = styled.div`
  color: var(--lightest-slate);
  font-size: var(--fz-md);
  padding-right: 20px;

  @media (max-width: 1400px) {
    padding-right: 0;
  }
  @media (max-width: 768px) {
    font-size: var(--fz-sm);
  }

  .project-intro {
    padding-bottom: 10px;
    span {
      color: var(--green);
    }
  }

  .project-features {
    ul {
      ${({ theme }) => theme.mixins?.fancyList};
      font-size: var(--fz-md);

      @media (max-width: 768px) {
        font-size: var(--fz-sm);
      }
    }
  }

  .project-technologies {
    padding-bottom: 10px;

    .highlight {
      color: var(--green);
    }

    .separator {
      margin: 0 5px 0 3px;
    }
  }
`;

const StyledProjectTitle = styled.h6`
  margin: 0;
  padding: 0;
  padding: 0 0 1rem 0;
  font-size: clamp(18px, 3.8vw, 36px);
  font-family:  var(--font-polo);
  color: var(--white);
  text-shadow:
    0 0 2px var(--white),
    0 0 10px var(--white),
    0 0 30px var(--green);
    0 0 45px var(--green);
`;

const StyledWebCarousel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .project-external-links {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;

    svg {
      transition: var(--transition);
      height: 25px;
      width: 25px;

      &:hover {
        transform: translateY(-7px);
      }
    }
  }
`;

const StyledWebContainer = styled.div`
  @media (max-width: 1400px) {
    display: none;
  }
`;

const StyledWebHeader = styled.div`
  border: 3px solid var(--green);
  border-bottom: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 50px;
  width: 100%;
  background-color: var(--black);

  svg {
    fill: var(--green);
    stroke: var(--green);
    width: 16px;
    height: 15px;
  }

  .top-web-header {
    display: flex;
    width: 100%;
    height: 50%;
    padding-top: 1px;

    .tab-web-header {
      display: flex;
      gap: 10px;
      width: fit-content;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      border-top-right-radius: 10px;
      border-right: 2px solid var(--green);
      white-space: nowrap;

      .tab-app-name {
        padding-top: 2px;
        color: var(--white);
        font-size: var(--fz-xxs);
      }
    }
    .options-web-header {
      display: flex;
      flex-grow: 1;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      border-bottom: 2px solid var(--green);
    }
  }

  .bottom-web-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-left: 10px;

    width: 100%;
    height: 50%;

    .bottom-web-header-search {
      padding: 5px;
      height: 50%;
      width: 50%;
      border: 1px solid var(--black);
      background-color: var(--green);
      border-radius: 20px;
    }
  }
`;

const StyledWebContent = styled.div`
  border: 3px solid var(--green);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  .img {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .carousel.carousel-slider li.slide.selected {
      z-index: 0 !important;
  }
`;

const StyledMobileCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .project-external-links {
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 1400px) {
      margin-rigth: 25px;
      margin-top: 25px;
      flex-direction: row;
    }

    svg {
      transition: var(--transition);
      height: 25px !important;
      width: 25px !important;

      &:hover {
        transform: translateY(-7px);
      }
    }
  }
`;

const StyledMobileContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1400px) {
    display: none;
  }
`;
const StyledMobileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 100%;
  border: 3px solid var(--green);
  border-bottom: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: var(--black);

  .header-line {
    width: 50%;
    height: 10px;
    background-color: var(--green);
    border-radius: 20px;
  }
`;

const StyledMobileContent = styled.div`
  border: 3px solid var(--green);
  max-width: 225px;

  .img {
    max-width: 225px;
  }

  .carousel.carousel-slider li.slide.selected {
      z-index: 0 !important;
  }
`;

const StyledMobileBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 100%;
  border: 3px solid var(--green);
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: var(--black);

  .circle {
    height: 25px;
    width: 25px;
    background-color: var(--green);
    border-radius: 50%;
    display: inline-block;
  }
`;

const ProjectsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges.filter(({ node }) => node);
  const revealProjectsList = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    scrollReveal.reveal(revealProjectsList.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => scrollReveal.reveal(ref, srConfig(i * 10)));
  }, []);

  const ProjectContent = node => {
    const { frontmatter, html } = node;
    const {
      title,
      images,
      technologies,
      awsTechnologies,
      features,
      link,
      github,
      youtube,
      gallery,
      isMobile,
    } = frontmatter;
    return (
      <div className="project-content">
        <StyledProjectTitle>
          {title}
        </StyledProjectTitle>
        <StyledProjectCardGrid>
          <StyledProjectDetails>
            <div className='project-intro' dangerouslySetInnerHTML={{ __html: html }} />
            <div className='project-features'>
              <ul>
                {features && features.map((feature, index) => (<li key={`project-feature-${index}`}>{feature}</li>))}
              </ul>
            </div>
            <div className='project-technologies'>
              <p><span className='highlight'>Technologies:&nbsp;&nbsp;</span>{technologies?.length > 0 &&
              technologies.map((item, i) => (
                <span key={i}>
                  {item}
                  {''}
                  {i !== technologies.length - 1 && (
                    <span className="separator"> &middot;</span>
                  )}
                </span>
              ))
              }</p>
            </div>
            {awsTechnologies?.length > 0 && (
              <div className='project-technologies'>
                <p><span className='highlight'>AWS Technologies:&nbsp;&nbsp;</span>{
                  awsTechnologies.map((item, i) => (
                    <span key={i}>
                      {item}
                      {''}
                      {i !== awsTechnologies.length - 1 && (
                        <span className="separator"> &middot;</span>
                      )}
                    </span>
                  ))
                }</p>
              </div>)
            }
          </StyledProjectDetails>
          {isMobile ? (
            <StyledMobileCarousel>
              <div className='project-external-links'>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" aria-label="External Link">
                    <Icon name="External" />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                    <Icon name="GitHub" />
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noreferrer" aria-label="Youtube Link">
                    <Icon name="Youtube" />
                  </a>
                )}
                {gallery && (
                  <a href={gallery} target="_blank" rel="noreferrer" aria-label="Gallery Link">
                    <Icon name="Gallery" />
                  </a>
                )}
              </div>
              <StyledMobileContainer>
                <StyledMobileHeader>
                  <div className='header-line'></div>
                </StyledMobileHeader>
                <StyledMobileContent>
                  <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    stopOnHover={true}
                    swipeable={false}
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    useKeyboardArrows={false}
                    dynamicHeight={true}
                    animationHandler={'fade'}
                    interval={4000}
                  >
                    {images.map(image => <GatsbyImage key={'carousel-image'} image={getImage(image)} alt={'project-screenshot'} className="img"/>)}
                  </Carousel>
                </StyledMobileContent>
                <StyledMobileBottom>
                  <div className='circle'></div>
                </StyledMobileBottom>
              </StyledMobileContainer>
            </StyledMobileCarousel>
          ) : (
            <StyledWebCarousel>
              <StyledWebContainer>
                <StyledWebHeader>
                  <div className='top-web-header'>
                    <div className='tab-web-header'>
                      <Icon name='WorldWide' />
                      <span className='tab-app-name'>{title}</span>
                      <Icon name='SmallClose' />
                    </div>
                    <div className='options-web-header'>
                      <Icon name='Minimize' />
                      <Icon name='ReduceScreen' />
                      <Icon name='Close' />
                    </div>
                  </div>
                  <div className='bottom-web-header'>
                    <Icon name='LeftArrow' />
                    <Icon name='RightArrow' />
                    <Icon name='Reload' />
                    <div className='bottom-web-header-search'>
                    </div>
                  </div>
                </StyledWebHeader>
                <StyledWebContent>
                  <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    stopOnHover={true}
                    swipeable={false}
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    useKeyboardArrows={false}
                    dynamicHeight={true}
                    animationHandler={'fade'}
                    interval={4000}
                  >
                    {images.map(image => <GatsbyImage key={'carousel-image'} image={getImage(image)} alt={title + ' - Daniel Oropeza'} className="img"/>)}
                  </Carousel>
                </StyledWebContent>
              </StyledWebContainer>
              <div className='project-external-links'>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" aria-label="External Link">
                    <Icon name="External" />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                    <Icon name="GitHub" />
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noreferrer" aria-label="Youtube Link">
                    <Icon name="Youtube" />
                  </a>
                )}
                {gallery && (
                  <a href={gallery} target="_blank" rel="noreferrer" aria-label="Gallery Link">
                    <Icon name="Gallery" />
                  </a>
                )}
              </div>
            </StyledWebCarousel>
          )}
        </StyledProjectCardGrid>
      </div>
    );
  };

  return (
    <>
      <PageTitle
        title="Projects"
        subtitle="Take a look to my featured projects!"
      />

      <StyledProjectsContainer ref={revealProjectsList} className={prefersReducedMotion ? '' : 'load-hidden'}>
        <ul className="projects-grid">
          {projects && projects.map(({ node }, i) => (
            <StyledProject key={i} ref={el => revealProjects.current[i] = el}>{ProjectContent(node)}</StyledProject>
          ))}
        </ul>

      </StyledProjectsContainer>
    </>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            technologies
            awsTechnologies
            features
            link
            github
            isMobile
            youtube
            gallery
            images {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
          html
        }
      }
    }
  }
`;

export const Head = () => (
  <SEO title="Projects" description="This page shows my projects in the Software Development industry" pathname="/projects"/>
);
