import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { PageTitle } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledVideosContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .videos-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 25px;
    position: relative;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledVideo = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .video-content {
        transform: translateY(-7px);
      }
    }
  }

  .video-content {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;

    &:hover {
      .img {
        mix-blend-mode: multiply;
        filter: grayscale(50%) contrast(1);
      }
    }
  }
`;

const StyledVideoImage = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  background-color: var(--green);
`;

const StyledVideoTitle = styled.h6`
  margin: 0;
  color: var(--lightest-slate);
  font-size: var(--fz-md);
  padding: 1rem 1.2rem;

  a {
    position: static;

    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
`;

const VideosPage = ({ data }) => {
  const videos = data.allMarkdownRemark.edges.filter(({ node }) => node);
  const revealVideoList = useRef(null);
  const revealVideos = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();


  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    scrollReveal.reveal(revealVideoList.current, srConfig(200, 0));
    revealVideos.current.forEach((ref, i) => scrollReveal.reveal(ref, srConfig(i * 10)));
  }, []);

  const VideoContent = node => {
    const { frontmatter } = node;
    const { url, title, thumbnail } = frontmatter;
    const image = getImage(thumbnail);
    return (
      <div className="video-content">
        <StyledVideoImage>
          <GatsbyImage image={image} alt={title} className="img"/>
        </StyledVideoImage>

        <StyledVideoTitle>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </StyledVideoTitle>
      </div>
    );
  };

  return (
    <>
      <PageTitle
        title="Videos"
        subtitle="Software development tutorials in Spanish!"
      />
      <StyledVideosContainer ref={revealVideoList} className={prefersReducedMotion ? '' : 'load-hidden'}>
        <ul className="videos-grid">
          {videos &&
              videos.map(({ node }, i) => (
                <StyledVideo
                  key={i}
                  ref={el => revealVideos.current[i] = el}
                >
                  {VideoContent(node)}
                </StyledVideo>
              ))}
        </ul>
      </StyledVideosContainer>
    </>
  );
};

VideosPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VideosPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/videos/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            url
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
