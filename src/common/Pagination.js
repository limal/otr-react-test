import React from "react";
import { withRouter } from "react-router-dom";
import * as BootstrapPagination from "react-bootstrap/Pagination";

const PAGINATION_RANGE = 5;

const Pagination = ({ currentPage, history, totalPages }) => {
  const handlePageChange = e => {
    e.preventDefault();

    const newCurrentPage = parseInt(
      e.target.attributes.getNamedItem("data-id").value
    );
    history.push(`/${newCurrentPage}`);
  };

  let items = [];
  for (
    let number =
      currentPage <= PAGINATION_RANGE ? 1 : currentPage - PAGINATION_RANGE;
    number <= Math.min(currentPage + PAGINATION_RANGE, totalPages);
    number++
  ) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        data-id={number}
        active={number === currentPage}
        onClick={handlePageChange}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return (
    <div className="Pagination">
      <BootstrapPagination size="md">{items}</BootstrapPagination>
    </div>
  );
};

export default withRouter(Pagination);
