import React from "react";
import "./App.css";
import Navnews from "./component/Navnews";
import About from "./component/About";
import Home from "./component/Home";
import ItemDetails from "./component/ItemDetails";
import Fetchxml from "./component/NewsAPI/Fetchxml";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Technology from "./component/Technology";
import Fetchapi from "./component/Fetchapi";
import Homefetchxml from "./component/Home/Homefetchxml";
import Opinion from "./component/Opinion/Opinion";
import Topstoriesfetchxml from "./component/Topstories/Topstoriesfetchxml";

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
        <Route path="/newsall/home" exact component={Homefetchxml} />
        <Route
          path="/newsall/top-stories"
          exact
          component={Topstoriesfetchxml}
        />
      </Router>
    </div>
  );
}

export default App;
