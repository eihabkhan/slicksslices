import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const BeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const BeersPage = ({ data }) => (
  <>
    <SEO title={`Beers! we have ${data.beers.nodes.length} in stock`} />
    <h2 className="center">
      We have {data.beers.nodes.length} beers available. Dine-in only!
    </h2>
    <BeerGridStyles>
      {data.beers.nodes
        .filter((node) => node.name !== null)
        .map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <BeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span
                  style={{
                    filter: `grayscale(100%)`,
                  }}
                >
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </BeerStyles>
          );
        })}
    </BeerGridStyles>
  </>
);

export default BeersPage;

export const query = graphql`
  {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
