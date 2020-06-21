import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import moment from "moment";
import newsapi from "../../newsapi.json";
import axios from "axios";
import Topstories from "./Topstories";

function Topstoriesfetchxml() {
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

  const [items, setItems] = useState([]);
  const fetchNewsapi = async () => {
    let newsItems = {};
    for (let i in newsapi.topstories) {
      console.log(newsapi.topstories[i].tag);
      let rtapi = newsapi.topstories[i].newsapi;
      //console.log(rtapi);
      //rtapi = await axios.get(`${rtapi}`).then((response) => response.data);
      rtapi = await axios
        .get(`${rtapi}`, {
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => response.data);

      let item1 = parseXML(rtapi);

      if (newsapi.topstories[i].tag === "Economic Times") {
        console.log("Economic Times");
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
            console.log(
              "Error inside economic times in Topstoriesfetchxml.js" + e
            );
          }
        });
      } else if (newsapi.topstories[i].tag === "India Today") {
        console.log("India Today");
        // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
        item1.map((item1) => {
          try {
            //decoding title

            //creating object index 4 and moving desc from [2] to [4]
            item1.children[4] = {
              name: "description",
              value: decodeText(item1.children[2].value),
            };
            //Moving pubdate from [1] to [2]
            item1.children[2].value = item1.children[1].value;
            item1.children[2].name = "link";
            item1.children[1].value = Date.parse(
              item1.children[3].value.replace("GMT", "+5:30")
            );
            item1.children[1].name = "pubDate";
            //moving image from [2][0].atr.src
            item1.children[3].value =
              item1.children[2].children[0].attributes.src;
            item1.children[3].name = "image";
            if (item1.children[3].value === "") {
              item1.children[3].value = require("../images/it.png");
            }

            //adding tag on [0[0]]
            item1.children[0].children[0] = {
              name: "tag",
              value: newsapi.topstories[i].tag,
            };
            item1.children[0].children[1] = {
              name: "logo",
              value: require("../images/it.png"),
            };
            item1.children[0].value = decodeText(item1.children[0].value);
          } catch (e) {
            console.log(
              "Error inside india today in Topstoriesfetchxml.js" + e
            );
          }
        });
      } else if (newsapi.topstories[i].tag === "Hindustan Times") {
        console.log("Hindustan Times inside");
        // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
        item1.map((item1) => {
          try {
            //decoding title

            item1.children[2].value = item1.children[2].value.replace(/>/g, "");
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
              name: "ht",
              value: require("../images/ht.jpg"),
            };
            //moving image from [5] to [3]
            item1.children[3].value = item1.children[5].attributes.url;
            item1.children[3].name = "image";
            item1.children[0].value = decodeText(item1.children[0].value);
            //console.log(item1);
          } catch (e) {
            console.log(
              "Error inside hindustan times in Topstoriesfetchxml.js" + e
            );
          }
        });
      } else if (newsapi.topstories[i].tag === "livemint") {
        console.log("livemint");

        // ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
        item1.map((item1) => {
          console.log(Date.parse("Tue, 16 Jun 2020 18:28:43+5:30"));
          //decoding title

          //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

          try {
            item1.children[5].value = item1.children[1].value;
            if (item1.children[3].name == "pubDate") {
              item1.children[1].value = Date.parse(item1.children[3].value);
            } else if (item1.children[4].name == "pubDate") {
              item1.children[1].value = Date.parse(item1.children[4].value);
            }
            item1.children[1].name = "pubDate";
            item1.children[4].value = decodeText(item1.children[2].value);
            item1.children[4].name = "description";
            item1.children[2].value = item1.children[5].value.replace(/>/g, "");
            item1.children[2].name = "link";

            //move image from [8] to [3]
            item1.children[3].value = item1.children[8].value;
            item1.children[3].name = "image";
            if (item1.children[3].value === "") {
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
            console.log("Error inside livemint in Topstoriesfetchxml.js" + e);
          }
        });
      } else if (newsapi.topstories[i].tag === "DNA India") {
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
              item1.children[3].value = require("../images/livemint.jpg");
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
            console.log("Error inside dnaindia in Topstoriesfetchxml.js" + e);
          }
        });
      } else if (newsapi.topstories[i].tag === "Zee News") {
        //ALL news API {0: title, 1:pubDate, 2:link,3: image, 4 description  },
        item1.map((item1) => {
          //decoding title
          item1.children[0].value = decodeText(item1.children[0].value);
          //Moving link from [1] to [3] to move pubDate from [4] to [1] and then move desc from [2] to [4] & finally move link from [3] to [2]

          try {
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
              value: require("../images/zeenews.jpg"),
            };
          } catch (e) {
            console.log("Error inside zee news in Topstoriesfetchxml.js" + e);
          }
          //console.log(item1);
        });
      } else if (newsapi.topstories[i].tag === "DDnews") {
        //console.log("inside ddnews");

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
        newsItems = item1;
      } else newsItems = [...newsItems, ...item1];
      setItems(newsItems);
    }
    //console.log(newsItems);

    //console.log(newsItems);
  };

  return <Topstories items={items} />;
}
export default Topstoriesfetchxml;
