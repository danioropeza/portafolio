import React, { useState, useEffect, Children } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { Layout } from '@components';

const PageContainer = ({ children, location, title, subtitle }) => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const Title = <h1 className="big-heading">{title}</h1>;
  const Subtitle = <p className="subtitle">{subtitle}</p>;

  const items = [Title, Subtitle];
  Children.toArray(children).forEach(child => items.push(child));

  return (
    <Layout location={location}>
      <Helmet title={title} />
      
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i * 300}ms` }}>{item}</div>
                </CSSTransition>
              ))}
        </TransitionGroup>
      )}
    </Layout>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageContainer;
