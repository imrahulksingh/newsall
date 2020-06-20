import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardGroup,
  ListGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

function Technology({ match }) {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const data = await fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5d2f05bcf3b74bb69784f20350e2200b"
    );
    const items = await data.json();
    //console.log(items.articles);
    setItems(items.articles);
  };
  //console.log(items);
  return (
    <Container>
      {items.map((items) => {
        return (
          <React.Fragment>
            <Row
              style={{
                background: "rgba(0,0,0,.03)",
              }}
            >
              <Col lg={8}>
                <Card>
                  <Card.Header></Card.Header>
                  <Card.Img variant="top" src={items.urlToImage} />
                </Card>
              </Col>
              <Col lg={3}>
                <Card>
                  <Card.Header
                    bg="black"
                    style={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "red",
                    }}
                  >
                    Economic Times
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{items.title}</Card.Title>
                    <hr></hr>
                    <Card.Text>{items.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
          </React.Fragment>
        );
      })}
    </Container>
  );
}

export default Technology;
