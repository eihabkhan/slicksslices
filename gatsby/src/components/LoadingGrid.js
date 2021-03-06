import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {Array.from({ length: count }, (_, index) => (
      <ItemStyles key={index}>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img
          className="loading"
          src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
          alt="loading"
          width="500"
          height="400"
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
