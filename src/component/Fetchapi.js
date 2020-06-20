import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import ItemDetails from "./ItemDetails";

function Fetchapi({ match }) {
  const fs = require("fs");
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
  return <Home item={items} />;
}
export default Fetchapi;
