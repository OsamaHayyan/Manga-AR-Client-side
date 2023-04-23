import React from "react";
import { Spinner } from "react-bootstrap";

export default function CheckData({ DataExist }) {
  if (DataExist) {
    return (
      <Spinner animation="border" role="status" style={{ margin: "30px" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return <h1>Data Not Found</h1>;
}
