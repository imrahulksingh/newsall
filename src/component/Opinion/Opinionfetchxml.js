import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import axios from "axios";

import { Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import newsapi from "../../newsapi.json";

function Opinionfetchxml() {
  useEffect(() => {
    fetchNewsapi();
  }, []);
  function decodeText(value) {
    let valueDesc = value.lastIndexOf("andgt;");
    valueDesc = value.replace(value.substring(0, valueDesc), "");
    valueDesc = valueDesc.replace(
      /andgt;|>|<!|\[CDATA|\[|andthinsp;|andnbsp;|andlt;p|andlt;\/p/g,
      ""
    );
    valueDesc = valueDesc.replace("andamp;", "&");
    valueDesc = valueDesc.replace(" andrsquo;s", "'s");
    valueDesc = valueDesc.replace(/\./g, ". ");
    return valueDesc;
  }
  function parseXML(data) {
    data = data.replace(/&/g, " and").replace(/%/g, " percent");
    data = new XMLParser().parseFromString(data);
    data = data.getElementsByTagName("item");
    return data;
  }
  const [opinionItems, setOpinionItems] = useState([]);
  let [length, setLength] = useState(8);
  // const handleChange = () => {
  //   length = length + 8;
  //   setLength(length);
  // };
  const fetchNewsapi = async () => {
    let opinionItems = {};

    for (let i in newsapi.opinion) {
      try {
        console.log(newsapi.opinion[i].tag);
        let rtapi = newsapi.opinion[i].newsapi;
        //console.log(rtapi);
        rtapi = await axios.get(`${rtapi}`).then((response) => response.data);
        let item1 = parseXML(rtapi);
        //console.log(item1);
        item1 = item1.slice(0, 10);
        if (newsapi.opinion[i].tag === "Economic Times") {
          console.log("Economic Times inside");
          console.log(newsapi.opinion[i].tag);
          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            try {
              //decoding title

              //Moving description from [4] to [1]
              item1.children[4].value = decodeText(item1.children[1].value);
              item1.children[4].name = "description";
              //moving pubDate from children[5] to [4] of item1
              item1.children[1].value = Date.parse(item1.children[5].value);
              item1.children[1].name = "pubDate";
              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/et.jpg"),
              };
              if (item1.children[3].value === "") {
                item1.children[3].value = require("../images/et.jpg");
              }
              item1.children[0].value = decodeText(item1.children[0].value);
              //console.log(item1);
            } catch (e) {
              console.log(
                "Error inside economic times in Opinionfetchxml.js" + e
              );
            }
          });
        } else if (newsapi.opinion[i].tag === "Hindustan Times") {
          console.log("Hndustan Times");
          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            try {
              //decoding title

              item1.children[2].value = item1.children[2].value.replace(
                />/g,
                ""
              );
              //Moving description from [1] to [3] to move pubDate from [4] to [1] and then move desc from [3] to [4]
              item1.children[3].value = item1.children[1].value;
              if (item1.children[3].value === "") {
                item1.children[3].value = require("../images/ht.jpg");
              }
              item1.children[1].value = Date.parse(item1.children[4].value);
              item1.children[1].name = "pubDate";
              item1.children[4].value = decodeText(item1.children[3].value);
              item1.children[4].name = "description";
              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/ht.jpg"),
              };
              //moving image from [5] to [3]
              item1.children[3].value = item1.children[5].attributes.url;
              item1.children[3].name = "image";
              item1.children[0].value = decodeText(item1.children[0].value);
              //console.log(item1);
            } catch (e) {
              console.log(
                "Error inside hindustan times in Opinionfetchxml.js" + e
              );
            }
          });
        } else if (newsapi.opinion[i].tag === "The Hindu") {
          console.log("The Hindu");
          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            //decoding title
            item1.children[0].value = decodeText(item1.children[0].value);
            //moving pubDate from [4] to [1]
            item1.children[1].name = "pubDate";
            item1.children[5].name = "";
            item1.children[1].value = Date.parse(item1.children[5].value);
            item1.children[2].name = "link";
            item1.children[2].value = item1.children[3].value;
            //moving description from children[5] to [3][0] of item1
            item1.children[4].value = decodeText(item1.children[4].value);
            item1.children[4].name = "description";

            item1.children[0].children[0] = {
              name: "tag",
              value: newsapi.opinion[i].tag,
            };
            item1.children[0].children[1] = {
              name: "logo",
              value: require("../images/th.png"),
            };
            item1.children[3].value = require("../images/thehindu-logo.png");
            item1.children[3].name = "image";
            //console.log(item1);
            //item1.value = Date.parse(item1.children[4].value);
          });
        } else if (newsapi.opinion[i].tag === "Outlook") {
          console.log("Outlook/Opinion");
          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            //decoding title
            item1.children[0].value = decodeText(item1.children[0].value);
            //moving link from [1] to [2]
            item1.children[2].value = item1.children[1].value;
            item1.children[2].name = "link";

            item1.children[1].name = "pubDate";

            item1.children[1].value = Date.parse(
              item1.children[3].children[1].value
            );

            item1.children[4].value = decodeText(item1.children[3].value);
            item1.children[4].name = "description";

            item1.children[3].value =
              item1.children[3].children[0].attributes.src;
            item1.children[3].name = "image";
            item1.children[0].children[0] = {
              name: "tag",
              value: newsapi.opinion[i].tag,
            };
            item1.children[0].children[1] = {
              name: "logo",
              value: require("../images/ol.jpg"),
            };
            //console.log(item1);
          });
        }
        if (i == 0) {
          opinionItems = item1;
        } else opinionItems = [...opinionItems, ...item1];
        setOpinionItems(opinionItems);
      } catch (e) {
        console.log("error caught inside opinion-home axios request");
      }
    }
  };

  return (
    <React.Fragment>
      {opinionItems.map((opinionItems) => {
        try {
          return (
            <Col>
              <Row
                style={{
                  background: "rgba(0,0,0,.03)",
                }}
              >
                <Col lg={4}>
                  <Card style={{ border: "0" }}>
                    <Card.Header></Card.Header>
                    <Card.Img
                      variant="top"
                      src={opinionItems.children[3].value}
                    />
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
                        src={opinionItems.children[0].children[1].value}
                        alt=""
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "grey",
                        }}
                      >
                        {opinionItems.children[0].children[0].value}
                      </span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <a
                          href={opinionItems.children[2].value}
                          target="block"
                          style={{
                            fontWeight: 500,
                            color: "black",
                          }}
                        >
                          {opinionItems.children[0].value}
                        </a>
                      </Card.Title>
                      <hr></hr>
                      <Card.Text>
                        {opinionItems.children[4].value.substring(0, 200)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Posted:{" "}
                        {moment(opinionItems.children[1].value).fromNow()}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <br />
              <br />
            </Col>
          );
        } catch (e) {
          console.log("Error inside return method of Topstories.js" + e);
        }
      })}
    </React.Fragment>
  );
}
export default Opinionfetchxml;
