const React = require('react');
const Layout = require('./src/components/Layout').default;

exports.wrapRootElement = ({ element }) => (
  <Layout>
    {element}
  </Layout>
);
