import React, { useEffect, useState } from "react";
import Twitterfeed from "../TwitterFeed/Twitterfeed";
import LogoDisplay from "../LogoDisplay/LogoDisplay";
import "../style.css";
import {
  Container,
  Col,
  Row,
  Media,
  Alert,
  Button,
  Carousel,
  Card,
  CardDeck,
} from "react-bootstrap";
import moment from "moment";

function Topstories(props) {
  const items = props.items;
  let [length, setLength] = useState(8);

  const handleChange = () => {
    length = length + 8;
    setLength(length);
  };

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
      console.log("Error inside compare method of Topstories.js" + e);
    }
  }
  items.sort(compare);
  //console.log(items);
  return (
    <Container>
      <Row>
        <Col lg={9}>
          {items.map((items) => {
            try {
              return (
                <React.Fragment>
                  <Row
                    style={{
                      background: "rgba(0,0,0,.03)",
                    }}
                  >
                    <Col lg={4}>
                      <Card style={{ border: "0" }}>
                        <Card.Header></Card.Header>
                        <Card.Img variant="top" src={items.children[3].value} />
                      </Card>
                    </Col>
                    <Col lg={8}>
                      <Card>
                        <Card.Header
                          bg="black"
                          style={{
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "red",
                          }}
                        >
                          <img
                            width={50}
                            height={25}
                            style={{
                              padding: "0 0 0 0",
                              boxSizing: "border-box",
                              margin: "auto",
                            }}
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
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <a
                              href={items.children[2].value}
                              target="block"
                              style={{
                                fontWeight: 500,
                                color: "black",
                              }}
                            >
                              {items.children[0].value}
                            </a>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text>
                            {items.children[4].value.substring(0, 200)}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">
                            Posted: {moment(items.children[1].value).fromNow()}
                          </small>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                  <br />
                  <br />
                </React.Fragment>
              );
            } catch (e) {
              console.log("Error inside return method of Topstories.js" + e);
            }
          })}
        </Col>
        <Col lg={3}>
          <div style={{ position: "sticky", top: "100px" }}>
            <img src="https://www.theweather.com/wimages/fotof4b0c2de094e4c4598a199dfb1306e5a.png"></img>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Topstories;
