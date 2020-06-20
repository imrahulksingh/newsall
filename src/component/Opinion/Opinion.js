import React, { Suspense } from "react";
import "../style.css";
import { Container, Col, Row, Alert, Spinner } from "react-bootstrap";
import Twitterfeed from "../TwitterFeed/Twitterfeed";
import LogoDisplay from "../LogoDisplay/LogoDisplay";
import Opinionfetchxml from "./Opinionfetchxml";

function Opinion() {
  // item.map((item) => {
  //   console.log(item.children[1].value);
  // });
  return (
    <div>
      <Container>
        <Row>
          <Twitterfeed />
          <Col lg={6}>
            <Alert
              variant="dark"
              style={{ position: "sticky", top: "55px", zIndex: "3" }}
            >
              <Alert.Heading>
                Opinion <LogoDisplay />
              </Alert.Heading>
            </Alert>

            <Suspense
              fallback={
                <React.Fragment>
                  <Spinner animation="border" size="sm" />
                  <Spinner animation="border" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" />
                </React.Fragment>
              }
            >
              <Opinionfetchxml />
            </Suspense>
          </Col>
          <Col lg={2}>
            <div style={{ position: "sticky", top: "100px" }}>
              <img src="https://www.theweather.com/wimages/fotof4b0c2de094e4c4598a199dfb1306e5a.png"></img>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  // } else {
  //   return <div>Loading...</div>;
  // }
}

export default Opinion;
