import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;

  & > * {
    padding: 1rem;
    flex: 1;
    margin: 0;
    border: 1px solid var(--grey);
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }

  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = nextPage > 2;

  return (
    <PaginationStyles>
      <Link
        title="Previous Page"
        disabled={!hasPrevPage}
        to={`${base}/${prevPage}`}
      >
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          key={index}
          className={currentPage === 1 && index === 0 ? 'current' : ''}
          to={`${base}/${index > 0 ? index + 1 : ''}`}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        title="Next Page"
        disabled={!hasNextPage}
        to={`${base}/${nextPage}`}
      >
        <span className="word">Next</span> &#8594;
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
