import React from "react";

import "../style.css";
import { Col, Row, Media } from "react-bootstrap";
import moment from "moment";

const OpinionHome = (props) => {
  const items = props.items;

  function compare(a, b) {
    try {
      // Use toUpperCase() to ignore character casing
      const publishDate1 = a.children[1].value;
      const publishDate2 = b.children[1].value;

      let comparison = 0;
      //console.log(publishDate1);
      if (publishDate1 > publishDate2) {
        comparison = -1;
      } else if (publishDate1 < publishDate2) {
        comparison = 1;
      }
      return comparison;
    } catch (e) {
      console.log("Error inside compare method of OpinionHome.js" + e);
    }
  }
  items.sort(compare);

  //console.log(items);
  return (
    <Col>
      {items.map((items) => {
        try {
          // let resultingString = isTruncated
          //   ? items.children[4].value.substring(0, 100)
          //   : items.children[4].value;
          // let readLength = isTruncated ? "...Read more" : "...Read less";

          return (
            <React.Fragment>
              <Row>
                <Media>
                  <Col sm={3} md={3}>
                    <Row>
                      <img
                        width={40}
                        height={25}
                        style={{ padding: "0 0 10px 10px" }}
                        src={items.children[0].children[1].value}
                        alt=""
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "500",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "grey",
                        }}
                      >
                        {items.children[0].children[0].value}
                      </span>
                    </Row>

                    <Row>
                      <img
                        width={164}
                        height={134}
                        className="mr-3"
                        src={items.children[3].value}
                        alt="Generic placeholder"
                      />
                    </Row>
                  </Col>
                  <Col sm={9} md={9}>
                    <Media.Body>
                      <h5>
                        <a
                          style={{
                            color: "black",
                            fontWeight: "400",
                            color: "black",
                          }}
                          target="black"
                          href={items.children[2].value}
                        >
                          {" "}
                          {items.children[0].value}{" "}
                        </a>
                      </h5>
                      <p
                        style={{
                          fontSize: "14px",
                          letterSpacing: ".25px",
                          lineHeight: "25px",
                          color: "black",
                        }}
                      >
                        {items.children[4].value.substring(0, 300)}{" "}
                        <a
                          style={{
                            color: "black",
                            textDecorationLine: "underline",
                          }}
                          target="black"
                          href={items.children[2].value}
                        >
                          ...Read more
                        </a>
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                          alignItems: "right",
                        }}
                      >
                        Last updated:{" "}
                        {moment(items.children[1].value).fromNow()}
                      </p>
                    </Media.Body>
                  </Col>
                </Media>
              </Row>
              <hr />
            </React.Fragment>
          );
        } catch (e) {
          console.log("Error inside return of OpinionHome.js" + e);
        }
      })}
    </Col>
  );
};
export default OpinionHome;
