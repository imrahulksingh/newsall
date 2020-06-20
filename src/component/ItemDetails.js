import React, { useEffect, useState } from "react";
import "./style.css";
import Fetchapi from "./Fetchapi";
import { Link } from "react-router-dom";

function ItemDetails({ match }) {
  useEffect(() => {
    fetchItems();
    console.log("match=" + JSON.stringify(match));
  }, []);

  const [item, setItem] = useState([]);
  const fetchItems = async () => {
    const data = await fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5d2f05bcf3b74bb69784f20350e2200b"
    );
    let items = await data.json();
    for (let i = 0; i < items.articles.length; i++) {
      let index = items.articles[i].publishedAt;
      console.log(index);
      if (index === match.params.id) {
        let itemsShort = items.articles[i];
        console.log(i);
        setItem(itemsShort);
      }
    }
  };
  console.log(item.url);
  console.log(item);
  return (
    <div
      className="container"
      style={{
        position: "relative",
        border: "1px solid red",
        //width: "40%",
        //   height: "5000px",
        //   paddingBottom: "100%",
        //   marginLeft: "50px",
        //   //pointerEvents: "none",
        //   //cursor: "default",
      }}
    >
      {/* <img src={item.urlToImage}></img>
      <h1>{item.title}</h1>
      <p>{item.description}</p> */}
      <div className="embed-responsive embed-responsive-21by9">
        <iframe
          className="embed-responsive-item"
          src={item.url}
          style={{
            //width: "100%",
            //   //   height: "100%",
            position: "absolute",
          }}
          frameBorder="0"
          scrolling="no"
          sandbox
        ></iframe>
      </div>
    </div>
  );
}

export default ItemDetails;
