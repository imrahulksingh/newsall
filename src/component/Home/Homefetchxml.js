import React, { useState, useEffect, Suspense } from "react";
import LogoDisplay from "../LogoDisplay/LogoDisplay";
import XMLParser from "react-xml-parser";
import axios from "axios";

import { Container, Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import newsapi from "../../newsapi.json";
const TopstoriesHome = React.lazy(() => import("./TopstoriesHome"));
const OpinionHome = React.lazy(() => import("./OpinionHome"));

function Homefetchxml() {
  useEffect(() => {
    fetchNewsapi();
  }, []);
  function decodeText(value) {
    let valueDesc = value.lastIndexOf("andgt;");
    valueDesc = value.replace(value.substring(0, valueDesc), "");
    valueDesc = valueDesc.replace(
      /andgt;|>|<!|\[CDATA|\[|andthinsp;|andlt;p|andlt;\/p/g,
      ""
    );
    valueDesc = valueDesc.replace("andamp;", "&");
    valueDesc = valueDesc.replace(/\./g, ". ");
    return valueDesc;
  }
  function parseXML(data) {
    data = data.replace(/&/g, " and").replace(/%/g, " percent");
    data = new XMLParser().parseFromString(data);
    data = data.getElementsByTagName("item");
    return data;
  }

  const [topstoriesItems, setTopstoriesItems] = useState([]);
  const [opinionItems, setOpinionItems] = useState([]);
  let [length, setLength] = useState(8);
  const handleChange = () => {
    length = length + 8;
    setLength(length);
  };
  const fetchNewsapi = async () => {
    let topstoriesItems = {};
    let opinionItems = {};
    for (let i in newsapi.topstories) {
      if (newsapi.topstories[i].category === "top-stories-home") {
        //console.log(newsapi.topstories[i].tag);
        let rtapi = newsapi.topstories[i].newsapi;
        //console.log(rtapi);
        rtapi = await axios.get(`${rtapi}`).then((response) => response.data);
        let item1 = parseXML(rtapi);

        item1 = item1.slice(0, 10);

        if (newsapi.topstories[i].tag === "Economic Times") {
          console.log("Economic Times inside");
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
            } catch (e) {
              console.log("Error inside economic times in homefetchxml.js" + e);
            }
          });
        } else if (newsapi.topstories[i].tag === "Hindustan Times") {
          console.log("Inside Hindustan Times");
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
            } catch (e) {
              console.log(
                "Error inside hindustan times in homefetchxml.js" + e
              );
            }
          });
        } else if (newsapi.topstories[i].tag === "livemint") {
          console.log("Inside livemint");

          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            //decoding title

            //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

            try {
              item1.children[5].value = item1.children[1].value;
              if (item1.children[3].name === "pubDate") {
                item1.children[1].value = Date.parse(item1.children[3].value);
              } else if (item1.children[4].name === "pubDate") {
                item1.children[1].value = Date.parse(item1.children[4].value);
              }
              item1.children[1].name = "pubDate";
              item1.children[4].value = decodeText(item1.children[2].value);
              item1.children[4].name = "description";
              item1.children[2].value = item1.children[5].value.replace(
                />/g,
                ""
              );
              item1.children[2].name = "link";

              //move image from [8] to [3]
              item1.children[3].value = item1.children[8].value;
              item1.children[3].name = "image";
              if (item1.children[3].value == "") {
                item1.children[3].value = require("../images/livemint.jpg");
              }
              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/livemint.jpg"),
              };
              item1.children[0].value = decodeText(item1.children[0].value);
            } catch (e) {
              //inserting dummy date to fix sorting issue
              item1.children[1] = {
                name: "pubDate",
                value: Date.parse("Tue, 16 Jun 2018 19:09:39+5:30"),
              };
              console.log("Error inside livemint in homefetchxml.js" + e);
            }
          });
        } else if (newsapi.topstories[i].tag === "DNA India") {
          console.log("Inside DNA India");
          // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            //decoding title

            //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

            try {
              item1.children[2].value = item1.children[1].value;
              item1.children[2].name = "link";
              item1.children[1].value = Date.parse(item1.children[3].value);
              item1.children[1].name = "pubDate";
              item1.children[4].value = decodeText(item1.children[4].value);
              //move image from [8] to [3]
              if (item1.children[6].attributes.type === "image/jpeg") {
                item1.children[3].value = item1.children[6].attributes.url;
              } else if (item1.children[7].attributes.type === "image/jpeg") {
                item1.children[3].value = item1.children[7].attributes.url;
              } else if (item1.children[8].attributes.type === "image/jpeg") {
                item1.children[3].value = item1.children[8].attributes.url;
              } else {
                item1.children[3].value = require("../images/dna.png");
              }
              item1.children[3].name = "image";

              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/dna.png"),
              };
              item1.children[0].value = decodeText(item1.children[0].value);
            } catch (e) {
              console.log("Error inside dnaindia in homefetchxml.js" + e);
            }
          });
        } else if (newsapi.topstories[i].tag === "Zee News") {
          console.log("Inside Zee News");
          //ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            try {
              //decoding title
              item1.children[0].value = decodeText(item1.children[0].value);
              //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

              item1.children[3].value = item1.children[1].value;

              item1.children[1].value = Date.parse(item1.children[4].value);
              item1.children[1].name = "pubDate";
              item1.children[4].value = decodeText(item1.children[2].value);
              item1.children[2].value = item1.children[3].value;
              item1.children[2].name = "link";
              //adding image
              item1.children[3].value = require("../images/zeenews.png");
              item1.children[3].name = "image";

              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/zeenews.png"),
              };
            } catch (e) {
              console.log("Error inside zee news in homefetchxml.js" + e);
            }
          });
        } else if (newsapi.topstories[i].tag === "DDnews") {
          console.log("inside DD News");

          //ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            try {
              //decoding title
              item1.children[0].value = decodeText(item1.children[0].value);
              //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

              item1.children[4].value = item1.children[1].value;

              item1.children[1].value = Date.parse(
                moment(
                  item1.children[3].value.replace(/ \|/g, ""),
                  //.replace(" pm", ":01 PM +5:30"),
                  "DD-MM-YYYY hh:mm A"
                )
              );
              item1.children[1].name = "pubDate";
              item1.children[3].value = item1.children[4].value;
              item1.children[4].value = decodeText(item1.children[2].value);
              item1.children[4].name = "description";
              item1.children[2].value = item1.children[3].value;
              item1.children[2].name = "link";
              //adding image
              item1.children[3].value = require("../images/ddnews.png");
              item1.children[3].name = "image";

              //adding tag on [0[0]]
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/ddnews.png"),
              };
              //console.log(item1);
            } catch (e) {
              console.log("Error inside dd news in homefetchxml.js" + e);
            }
          });
        } else if (newsapi.topstories[i].tag === "Business Standard") {
          console.log("inside Business Standard");
          //console.log(item1);

          //ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
          item1.map((item1) => {
            try {
              //decoding title
              item1.children[0].value = decodeText(item1.children[0].value);
              //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

              item1.children[2].value = item1.children[1].value;
              item1.children[2].name = "link";
              if (item1.children[5].name === "pubDate") {
                item1.children[1].value = Date.parse(item1.children[5].value);
              } else if (item1.children[4].name === "pubDate") {
                item1.children[1].value = Date.parse(item1.children[4].value);
              }
              item1.children[1].name = "pubDate";
              item1.children[4].value = item1.children[3].value;
              item1.children[4].name = "description";

              item1.children[3].value =
                item1.children[4].children[0].attributes.url;
              item1.children[3].name = "image";
              item1.children[0].children[0] = {
                name: "tag",
                value: newsapi.topstories[i].tag,
              };
              item1.children[0].children[1] = {
                name: "logo",
                value: require("../images/bs.jpg"),
              };

              //console.log(item1);
            } catch (e) {
              console.log("Error inside dd news in homefetchxml.js" + e);
            }
          });
        }

        if (i == 0) {
          topstoriesItems = item1;
        } else topstoriesItems = [...topstoriesItems, ...item1];
        setTopstoriesItems(topstoriesItems);
      }

      //console.log(topstoriesItems);

      //console.log(topstoriesItems);
    }
    for (let i in newsapi.opinion) {
      if (newsapi.opinion[i].category === "opinion-home") {
        try {
          //console.log(newsapi.opinion[i].tag);
          let rtapi = newsapi.opinion[i].newsapi;
          //console.log(rtapi);
          rtapi = await axios.get(`${rtapi}`).then((response) => response.data);
          let item1 = parseXML(rtapi);
          //console.log(item1);
          item1 = item1.slice(0, 10);
          if (newsapi.opinion[i].tag === "Economic Times") {
            console.log("Inside Economic Times Opinion");
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
                  "Error inside economic times in homefetchxml.js" + e
                );
              }
            });
          } else if (newsapi.opinion[i].tag === "Hindustan Times") {
            console.log("Inside Hndustan Times Opinion");
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
                  "Error inside hindustan times in homefetchxml.js" + e
                );
              }
            });
          } else if (newsapi.opinion[i].tag === "The Hindu") {
            console.log("Inside The Hindu Opinion");
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
            console.log("Inside Outlook Opinion");
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
    }
  };
  console.log(topstoriesItems);
  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <Row>
            <Col style={{ height: "420px", overflowY: "hidden" }}>
              <Card>
                <Card.Header>
                  <a
                    href="/top-stories"
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      fontStyle: "solid",
                      color: "black",
                    }}
                  >
                    Top Stories
                  </a>
                  <LogoDisplay />
                  {/* {items.children[0].children[0].value} */}
                </Card.Header>
                <div className="col-top-stories">
                  <Card.Body>
                    <Row>
                      <Suspense fallback={<div>Loading....</div>}>
                        <TopstoriesHome items={topstoriesItems} />
                      </Suspense>
                    </Row>
                    <hr></hr>
                  </Card.Body>
                </div>
                <hr></hr>
              </Card>
              <hr></hr>
            </Col>
          </Row>
          <br />
          <hr></hr>
          <br />
          <Row>
            <Col style={{ height: "420px", overflowY: "hidden" }}>
              <Card>
                <Card.Header
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    fontStyle: "solid",
                    color: "dark",
                  }}
                >
                  Opinion
                  {/* {items.children[0].children[0].value} */}
                </Card.Header>
                <div className="col-top-stories">
                  <Card.Body>
                    <Row>
                      <Suspense fallback={<div>Loading....</div>}>
                        <OpinionHome items={opinionItems} />
                      </Suspense>
                    </Row>
                  </Card.Body>
                </div>
              </Card>

              <hr></hr>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col style={{ height: "420px", overflowY: "hidden" }}>
              <Card>
                <Card.Header
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    fontStyle: "solid",
                    color: "dark",
                  }}
                >
                  Sports
                  {/* {items.children[0].children[0].value} */}
                </Card.Header>
                <div className="col-top-stories">
                  <Card.Body>
                    <Row>
                      <Suspense fallback={<div>Loading....</div>}>
                        <TopstoriesHome items={topstoriesItems} />
                      </Suspense>
                    </Row>
                  </Card.Body>
                </div>
              </Card>

              <hr></hr>
            </Col>
          </Row>
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
export default Homefetchxml;
