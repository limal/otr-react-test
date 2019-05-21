import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import BooksList from "./BookList";
import Pagination from "../common/Pagination";

const BOOKS_API_ENDPOINT = "http://nyx.vima.ekt.gr:3000/api/books";
const BOOKS_PER_PAGE = 5;

const Books = ({ history, match: { params }, ...props }) => {
  const inputQuery = useRef(null);
  const [books, setBooks] = useState({ books: [], count: 0 });
  const [query, setQuery] = useState("");
  const currentPageFromUrl = parseInt(params.page) || 1;

  const handleKeyDown = async e => {
    if (e.keyCode === 13) {
      setQuery(inputQuery.current.value);
      history.push(`/1`);
    }
  };

  const handleFilter = async e => {
    e.preventDefault();

    setQuery(inputQuery.current.value);
    history.push(`/1`);
  };

  const fetchBooks = async ({ page, itemsPerPage = BOOKS_PER_PAGE }) => {
    const filters = { filters: [{ type: "all", values: [query] }] };
    const response = await fetch(BOOKS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page,
        itemsPerPage,
        ...filters
      })
    });

    setBooks(await response.json());
  };

  useEffect(() => {
    async function fetchData() {
      await fetchBooks({ page: currentPageFromUrl });
    }

    fetchData();
  }, [query, params]);

  return (
    <div className="Books">
      <InputGroup className="mb-3">
        <FormControl
          ref={inputQuery}
          placeholder="Enter your query..."
          aria-label="Filter query"
          aria-describedby="basic-addon1"
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </InputGroup>
      <Button variant="primary" onClick={handleFilter}>
        Filter
      </Button>
      <BooksList items={books.books} />
      <Pagination
        currentPage={currentPageFromUrl}
        totalPages={books.count / BOOKS_PER_PAGE}
      />
    </div>
  );
};

export default withRouter(Books);
