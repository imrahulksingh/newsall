import React from "react";
import { Link } from "react-router-dom";

function Home(props, { match }) {
  const items = props.item;
  return (
    // <div className="image-div">
    <div className="row no-gutters">
      <div className="row row-cols-4">
        {items.map((item) => {
          return (
            <div className="col">
              <span key={item.publishedAt}>
                <Link to={`/home/${item.publishedAt}`}>
                  <img
                    src={item.urlToImage}
                    className="img-fluid img-thumbnail"
                  />
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
