import React from "react";
import "./App.css";
import Navnews from "./component/Navnews";
import About from "./component/About";
import ItemDetails from "./component/ItemDetails";
import { HashRouter as Router, Route } from "react-router-dom";
import Technology from "./component/Technology";
import Fetchapi from "./component/Fetchapi";
import Homefetchxml from "./component/Home/Homefetchxml";
import Opinion from "./component/Opinion/Opinion";
import Topstoriesfetchxml from "./component/Topstories/Topstoriesfetchxml";
import Figures from "./component/Figures/Figures";

function App() {
  return (
    <div className="App">
      <Navnews />
      <Router>
        <Route path="/newshome" exact component={Fetchapi} />
        <Route path="/home/:id" component={ItemDetails} />
        <Route path="/about" component={About} />
        <Route path="/technology" component={Technology} />
        <Route path="/opinion" exact component={Opinion} />
        <Route path="/home" exact component={Homefetchxml} />
        <Route path="/top-stories" exact component={Topstoriesfetchxml} />
        <Route path="/graph-news" exact component={Figures} />
      </Router>
    </div>
  );
}

export default App;
