import React from "react";
import { Card } from "react-bootstrap";

function LogoDisplay() {
  return (
    <React.Fragment>
      <Card.Img
        style={{
          width: "3%",
          height: "3%",
          float: "right",
        }}
        variant="top"
        src={require("../images/th.png")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "3%",
          height: "3%",
          float: "right",
        }}
        variant="top"
        src={require("../images/et.cms")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "3%",
          height: "3%",
          float: "right",
        }}
        variant="top"
        src={require("../images/ol.png")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "5%",
          height: "5%",
          float: "right",
        }}
        variant="top"
        src={require("../images/dna.png")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "5%",
          height: "5%",
          float: "right",
        }}
        variant="top"
        src={require("../images/ht.jpg")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "5%",
          height: "5%",
          float: "right",
        }}
        variant="top"
        src={require("../images/it.png")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "5%",
          height: "5%",
          float: "right",
        }}
        variant="top"
        src={require("../images/livemint.jpg")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "5%",
          height: "5%",
          float: "right",
        }}
        variant="top"
        src={require("../images/ddnews.png")}
        alt=""
      />{" "}
      <Card.Img
        style={{
          width: "6%",
          height: "4%",
          float: "right",
          marginTop: "-10px",
        }}
        variant="top"
        src={require("../images/zeenews.png")}
        alt=""
      />{" "}
    </React.Fragment>
  );
}
export default LogoDisplay;
