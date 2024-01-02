const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement  = ({ element }) => (
  <Layout>
    {element}
  </Layout>
);

exports.shouldUpdateScroll = () => {
  window.scrollTo(0, 0);
  return [0, 0];
};