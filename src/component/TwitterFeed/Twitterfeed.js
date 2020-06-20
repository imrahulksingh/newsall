import React from "react";
import { Col } from "react-bootstrap";

function Twitterfeed() {
  return (
    <Col lg={4}>
      <div
        // className="container-left"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.125)",
          borderRadius: "0.25rem",
          position: "-webkit-sticky",
          position: "sticky",
          top: "100px",
        }}
      >
        <a
          className="twitter-timeline"
          data-lang="en"
          data-width="400"
          data-height="900"
          data-theme="light"
          href="https://twitter.com/rahulksingh07/lists/latest-tweets?ref_src=twsrc%5Etfw"
        ></a>{" "}
      </div>
    </Col>
  );
}
export default Twitterfeed;
