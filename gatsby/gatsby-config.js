import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: `https://www.gatsbyjs.com`,
    description: `The best pizza in town`,
    twitter: `@slicksslices`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      //   name of plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'w23cv1ue',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
