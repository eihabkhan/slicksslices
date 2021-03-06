// Code in the file gatsby-node.js is run once in the process of building your site. You can use it to create pages dynamically, add nodes in GraphQL, or respond to events during the build lifecycle
import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasToPages = async ({ graphql, actions }) => {
  // 1- get template for this
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2- query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3- loop over each pizza and create page for it
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // url for the page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // 1- get template for this
  const ToppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2- query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3- loop over each pizza and create page for it
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // url for the page
      path: `topping/${topping.name}`,
      component: ToppingTemplate,
      context: {
        topping: topping.name,
        // REGEX for topping
      },
    });
  });
};

const fetchBeersIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // 1. Fetch list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. loop over
  beers.forEach((beer) => {
    // 3. create node for beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        // Internal thing in gatsby to know if the data changed or not:
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const {
    data: { slicemasters },
  } = await graphql(`
    {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 1. query slicemsters
  // TODO: 2. turn each master to own page
  slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemasters/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. how many pages, how many slicemasters, how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(slicemasters.totalCount / pageSize);
  console.log(
    `There are ${slicemasters.totalCount} total people. We have ${pageCount} pages with ${pageSize} per page`
  );
  // 4. loop from one to n, n = number of pages
  Array.from({ length: pageCount }).forEach((_, index) => {
    console.log(`Creating page (${index})`);
    actions.createPage({
      path: `/slicemasters/${index + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This is passed to template:
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    });
  });
};

// Extension point to tell plugins to source nodes
exports.sourceNodes = async (params) => {
  // Fetch list of beers and source them to gatsby
  await Promise.all([fetchBeersIntoNodes(params)]);
};

export const createPages = async (params) => {
  // create pages dynamically
  await Promise.all([
    turnPizzasToPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  //   1. Pizzas
  //   2. Toppings
  //   3. Slicemasters
};
