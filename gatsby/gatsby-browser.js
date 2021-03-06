// The file gatsby-browser.js lets you respond to actions within the browser, and wrap your site in additional components. Ref: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

import React from 'react';

import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export const wrapPageElement = ({ element, props }) => (
  // A special gatsby function Allow a plugin to wrap the page element.
  /* eslint-disable react/jsx-props-no-spreading */
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);
