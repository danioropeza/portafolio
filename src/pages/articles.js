import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { PageTitle } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledArticlesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .articles-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 25px;
    position: relative;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledArticle = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      a {
        color: var(--white);
        text-shadow:
          0 0 21px var(--white),
          0 0 60px var(--green);
      }
      .article-content {
        transform: translateY(-7px);
      }
    }
  }

  .article-content {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: var(--border-radius);
    border: 1px solid var(--green);
    background-color: transparent;
    transition: var(--transition);
    overflow: auto;

    &:hover {
      .img {
        mix-blend-mode: normal;
        filter: none;
      }
    }
  }
`;

const StyledArticleCardGrid = styled.section`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 70% 30%;
  grid-gap: 0;
`;

const StyledArticleTitle = styled.h6`
  margin: 0;
  color: var(--lightest-slate);
  font-size: var(--fz-xl);
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

const StyledArticleDate = styled.h6`
  margin: 0;
  color: var(--green);
  font-size: var(--fz-xl);
  padding: 1rem 1.2rem;
`;

const StyledArticleDescription = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  color: var(--lightest-slate);
  font-size: var(--fz-md);
  margin: 0 1.2rem 1rem 1.2rem;
`;


const StyledArticleImage = styled.div`
  background-color: var(--green);
  margin: 0 1.2rem 1rem 1.2rem;

  .img {
    mix-blend-mode: multiply;
    filter: grayscale(50%) contrast(1);
  }
`;

const StyledArticleKeywords = styled.span`
  margin: 0;
  color: var(--lightest-slate);
  font-size: var(--fz-xxs);
  font-family: var(--font-mono);
  padding: 0  1.2rem 1rem 1.2rem;

  .separator {
    margin: 0 5px;
  }
  span {
    display: inline-block;
  }
`;

const ArticlesPage = ({ data }) => {
  const articles = data.allMarkdownRemark.edges.filter(({ node }) => node);
  const revealArticlesList = useRef(null);
  const revealArticles = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    scrollReveal.reveal(revealArticlesList.current, srConfig(200, 0));
    revealArticles.current.forEach((ref, i) => scrollReveal.reveal(ref, srConfig(i * 10)));
  }, []);

  const ArticleContent = node => {
    const { frontmatter } = node;
    const { url, title, description, thumbnail, keywords, date } = frontmatter;
    const year = new Date(date).getFullYear();
    const image = getImage(thumbnail);
    return (
      <div className="article-content">
        <StyledArticleCardGrid>
          <StyledArticleTitle>
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </StyledArticleTitle>
          <StyledArticleDate>
            {year}
          </StyledArticleDate>
          <StyledArticleDescription>
            {description}
          </StyledArticleDescription>
          <StyledArticleImage>
            <GatsbyImage image={image} alt={title} className="img"/>
          </StyledArticleImage>
        </StyledArticleCardGrid>
        <StyledArticleKeywords>
          {keywords?.length > 0 &&
            keywords.map((item, i) => (
              <span key={i}>
                {item}
                {''}
                {i !== keywords.length - 1 && (
                  <span className="separator">&middot;</span>
                )}
              </span>
            ))
          }
        </StyledArticleKeywords>
      </div>
    );
  };

  return (
    <>
      <PageTitle
        title="Articles"
        subtitle="I produce valuable content focused on Software Development!"
      />
      <StyledArticlesContainer ref={revealArticlesList} className={prefersReducedMotion ? '' : 'load-hidden'}>
        <ul className="articles-grid">
          {articles && articles.map(({ node }, i) => (
            <StyledArticle key={i} ref={el => revealArticles.current[i] = el}>{ArticleContent(node)}</StyledArticle>
          ))}
        </ul>

      </StyledArticlesContainer>
    </>
  );
};

ArticlesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticlesPage;

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
                gatsbyImageData(aspectRatio: 1, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
          html
        }
      }
    }
  }
`;
