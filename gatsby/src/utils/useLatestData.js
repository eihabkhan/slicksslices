import { useState, useEffect } from 'react';

const gql = String.raw;

const details = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const useLatestData = () => {
  // Hot slices
  const [hotSlices, setHotSlices] = useState();
  //   Slicemasters
  const [slicemasters, setSlicemasters] = useState();
  //   use side effect to fetch data from graphQL endpoint
  useEffect(() => {
    //   when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "ville") {
              name
              slicemasters {
                ${details}
              }
              hotSlices {
                ${details}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set data to state
        console.log(res.data.StoreSettings);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
      })
      .catch((error) => console.log('ERROR', error));
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
