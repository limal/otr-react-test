import React from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

const BooksList = ({ items }) => {
  return (
    <div className="BooksList">
      <ListGroup>
        {items && items.length ? (
          items.map((item, index) => (
            <ListGroup.Item
              key={item.id}
              className={index % 2 ? "BooksList__Item--Alternate" : ""}
            >
              <em className="BooksList__Item__Id">{item.id}</em>{" "}
              <span className="BooksList__Item__Title">{item.book_title}</span>
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="primary">No books found</Alert>
        )}
      </ListGroup>
    </div>
  );
};

export default BooksList;
