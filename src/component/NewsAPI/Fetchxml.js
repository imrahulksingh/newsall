import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from "moment";
//import { nanoid } from "nanoid";
// import {
//   Card,
//   CardGroup,
//   ListGroup,
//   Container,
//   Col,
//   Row,
// } from "react-bootstrap";

function decodeText(value) {
  let valueDesc = value.lastIndexOf("andgt;");
  valueDesc = value.replace(value.substring(0, valueDesc), "");
  valueDesc = valueDesc.replace(/andgt;|>|<!|\[CDATA|\[|andthinsp;/g, "");
  return valueDesc;
}

function Fetchxml(props) {
  useEffect(() => {
    fetchItems();
  }, []);
  function parseXML(data) {
    data = data.replace(/&/g, " and").replace(/%/g, " percent");
    data = new XMLParser().parseFromString(data);
    data = data.getElementsByTagName("item");
    return data;
  }

  const [items, setItems] = useState([]);
  let [isLoaded, setIsLoaded] = useState("false");
  const fetchItems = async () => {
    let thehindu =
      "https://cors-anywhere.herokuapp.com/https://www.thehindu.com/opinion/feeder/default.rss";
    // let timesofIndia = "";
    // //   "https://cors-anywhere.herokuapp.com/https://timesofindia.indiatimes.com/rssfeeds/784865811.cms";
    let outlook =
      "https://cors-anywhere.herokuapp.com/https://www.outlookindia.com/rss/subsection/5";
    let hindustanExpress =
      "https://cors-anywhere.herokuapp.com/https://indianexpress.com/section/opinion/editorials/feed/";
    let hindustanTimes =
      "https://cors-anywhere.herokuapp.com/https://www.hindustantimes.com/rss/opinion/rssfeed.xml";
    let economicTimes =
      "https://cors-anywhere.herokuapp.com/https://economictimes.indiatimes.com/opinion/rssfeeds/897228639.cms";
    economicTimes = await fetch(economicTimes);
    thehindu = await fetch(thehindu);
    outlook = await fetch(outlook);
    hindustanExpress = await fetch(hindustanExpress);
    hindustanTimes = await fetch(hindustanTimes);

    const fetchData = await Promise.all([
      economicTimes,
      thehindu,
      outlook,
      hindustanExpress,
      hindustanTimes,
    ]).then((values) => {
      return Promise.all(values.map((response) => response.text()));
    });
    economicTimes = parseXML(fetchData[0]);
    thehindu = parseXML(fetchData[1]);
    // timesofIndia = parseXML(fetchData[2]);
    outlook = parseXML(fetchData[2]);
    hindustanExpress = parseXML(fetchData[3]);
    hindustanTimes = parseXML(fetchData[4]);

    // ALL news API {0: title, 1:pubDate, 2:link,3: image, 3.0 description  },
    economicTimes.map((economicTimes) => {
      //decoding title
      economicTimes.children[0].value = decodeText(
        economicTimes.children[0].value
      );
      //Moving description from [1] to [3].[0]
      economicTimes.children[3].children[0] = {
        name: "description",
        value: decodeText(economicTimes.children[1].value),
      };

      economicTimes.children[3].children[1] = {
        name: "tag",
        value: "Economic Times",
      };

      //console.log(economicTimes.children[5].value);
      //moving pubDate from children[5] to [4] of item1
      economicTimes.children[1].value = Date.parse(
        economicTimes.children[5].value
      );
      economicTimes.children[1].name = "pubDate";
      economicTimes.children[5].name = "";
      //economicTimes.value = Date.parse(economicTimes.children[4].value);
    });
    // timesofIndia.map((timesofIndia) => {
    //   //Moving description from [1] to [3].[0]
    //   timesofIndia.children[3].children = [
    //     {
    //       name: "description",
    //       value: timesofIndia.children[1].value,
    //     },
    //   ];
    //   // console.log(
    //   //   moment(timesofIndia.children[4].value.replace("IST", "+5:30")).format(
    //   //     "YYYY-MM-DD HH:MM:SS Z"
    //   //   )
    //   // );
    //   //console.log(timesofIndia.children[4].value.replace("IST", "+5:30"));
    //   //moving pubDate from children[5] to [4] of item1
    //   // timesofIndia.children[1].value = Date.parse(
    //   //   timesofIndia.children[4].value
    //   // );
    //   // timesofIndia.children[1].name = "pubDate";
    //   // timesofIndia.children[4].name = "";
    //   // //setting TOI logo image in children[3] for item2
    //   // timesofIndia.children[3].value =
    //   //   "https://pbs.twimg.com/profile_images/1282407636/icon_512_400x400.png";
    //   //timesofIndia.name = "pubDate";
    //   //timesofIndia.value = Date.parse(timesofIndia.children[4].value);
    // });
    //console.log(timesofIndia);
    //0:title; 1: pubdate; 2:link; 3: image; 3.children[0]: description
    thehindu.map((thehindu) => {
      //decoding title
      thehindu.children[0].value = decodeText(thehindu.children[0].value);
      //moving pubDate from [4] to [1]
      thehindu.children[1].name = "pubDate";
      thehindu.children[5].name = "";
      thehindu.children[1].value = Date.parse(thehindu.children[5].value);
      //moving description from children[5] to [3][0] of item1
      thehindu.children[3].children[0] = {
        name: "description",
        value: decodeText(thehindu.children[4].value),
      };
      thehindu.children[3].children[1] = {
        name: "tag",
        value: "The Hindu",
      };

      //moving link from children[3] to [2] of item1
      thehindu.children[2].value = thehindu.children[3].value;
      thehindu.children[3].value = require("../images/thehindu-logo.png");

      //thehindu.value = Date.parse(thehindu.children[4].value);
    });
    // outlook.map((outlook) => {

    //   //decoding title
    //   outlook.children[0].value = decodeText(outlook.children[0].value);
    //   //moving link from [1] to [2]
    //   outlook.children[2].value = outlook.children[1].value;
    //   //moving pubDate from [3][0][0].value to [1] of item
    //   outlook.children[1].name = "pubDate";
    //   outlook.children[3].children[1].name = "tag";
    //   outlook.children[3].children[0].name = "description";
    //   outlook.children[1].value = Date.parse(
    //     outlook.children[3].children[1].value
    //   );
    //   //moving description from [3] to [3][0]
    //   outlook.children[3].children[0].value = decodeText(
    //     outlook.children[3].value
    //   );
    //   //adding tag to [3][1]
    //   outlook.children[3].children[1].value = "Outlook";
    //   //moving image from [3][0][0].src to [3]
    //   outlook.children[3].value =
    //     outlook.children[3].children[0].attributes.src;
    // });

    hindustanExpress.map((hindustanExpress) => {
      //decode title
      hindustanExpress.children[0].value = decodeText(
        hindustanExpress.children[0].value
      );
      //moving link to [2] from [1]
      hindustanExpress.children[2].value = hindustanExpress.children[1].value;
      //moving pubDate from [3] to [1]
      hindustanExpress.children[1].value = hindustanExpress.children[3].value;
      hindustanExpress.children[1].name = "pubDate";
      //image set to null
      hindustanExpress.children[3].value = "";
      hindustanExpress.children[3].name = "image";
      //moving description from [7] to [3][0]
      hindustanExpress.children[3].children[0] = {
        name: "description",
        value: decodeText(hindustanExpress.children[7].value),
      };
      hindustanExpress.children[3].children[1] = {
        name: "tag",
        value: "Indian Express",
      };
    });
    hindustanTimes.map((hindustanTimes) => {
      //decode title
      hindustanTimes.children[0].value = decodeText(
        hindustanTimes.children[0].value
      );
      //moving description from [7] to [3][0]
      hindustanTimes.children[3].children[0] = {
        name: "description",
        value: decodeText(hindustanTimes.children[1].value),
      };
      hindustanTimes.children[3].children[1] = {
        name: "tag",
        value: "Indian Express",
      };
      //moving link to [2] from [1]
      // hindustanTimes.children[2].value =
      //   hindustanTimes.children[1].value;
      //moving pubDate from [3] to [1]
      hindustanTimes.children[1].value = hindustanTimes.children[4].value;
      hindustanTimes.children[1].name = "pubDate";
      //image set to null
      hindustanTimes.children[3].value = "";
      hindustanTimes.children[3].name = "image";
    });
    //console.log(hindustanTimes);
    let items = [
      ...economicTimes,
      ...thehindu,
      //...timesofIndia,
      ...outlook,
      ...hindustanExpress,
      ...hindustanTimes,
    ];

    setItems(items);

    // });
  };
  //console.log(items);

  return <h1></h1>;
}

export default Fetchxml;
