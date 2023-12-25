import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { PageTitle } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import { IconReload, IconLeftRow, IconRightRow, IconClose, IconSmallClose, IconMinimize, IconReduceScreen, IconWorldWide } from '@components/icons';

const StyledProjectsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(1000px, 1fr));
    grid-gap: 50px;
    position: relative;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  .project-content {
    display: flex;
    position: relative;
    background-color: transparent;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      a {
        color: var(--white);
        text-shadow:
          0 0 21px var(--white),
          0 0 60px var(--green);
      }
    }
  }
`;

const StyledProjectCardGrid = styled.section`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 20px;
`;

const StyledProjectDetails = styled.div`
  color: var(--lightest-slate);
  font-size: var(--fz-md);
`;

const StyledProjectTitle = styled.h6`
  margin: 0;
  padding: 0;
  color: var(--lightest-slate);
  font-size: var(--fz-heading);
  padding: 0 0 1rem 0;

  color: var(--white);
  text-shadow:
      0 0 7px var(--white),
      0 0 21px var(--white),
      0 0 42px var(--green),
      0 0 82px var(--green),
      0 0 151px var(--green);
`;

const StyledProjectCarousel = styled.div`
  display: flex;
  flex-direction: column;
`;


const StyledWebHeader = styled.div`
  border: 3px solid var(--green);
  border-bottom: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 50px;
  width: 100%;

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
    background-color: transparent;

    width: 100%;
    height: 50%;

    .bottom-web-header-search {
      padding: 5px;
      height: 60%;
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
    const { frontmatter } = node;
    const { title, description, thumbnail, keywords } = frontmatter;
    const image = getImage(thumbnail);

    return (
      <div className="project-content">
        <StyledProjectCardGrid>
          <StyledProjectDetails>
            <StyledProjectTitle>
              {title}
            </StyledProjectTitle>
            <p>{description}</p>

            <p>Technologies: {keywords?.length > 0 &&
            keywords.map((item, i) => (
              <span key={i}>
                {item}
                {''}
                {i !== keywords.length - 1 && (
                  <span className="separator">, </span>
                )}
              </span>
            ))
            }</p>
          </StyledProjectDetails>
          <StyledProjectCarousel>
            <StyledWebHeader>
              <div className='top-web-header'>
                <div className='tab-web-header'>
                  <IconWorldWide />
                  <span className='tab-app-name'>Admin Domufix</span>
                  <IconSmallClose />
                </div>
                <div className='options-web-header'>
                  <IconMinimize />
                  <IconReduceScreen />
                  <IconClose />
                </div>
              </div>
              <div className='bottom-web-header'>
                <IconLeftRow />
                <IconRightRow />
                <IconReload />
                <div className='bottom-web-header-search'>
                </div>
              </div>
            </StyledWebHeader>
            <StyledWebContent>
              <GatsbyImage image={image} alt={title} className="img"/>
            </StyledWebContent>
          </StyledProjectCarousel>
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
      filter: { fileAbsolutePath: { regex: "/content/articles/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            url
            keywords
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 315, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
          html
        }
      }
    }
  }
`;
