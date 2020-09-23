import React, { useState } from "react";
import "./search.css";

function Search(props) {
  const [searchtext, setSearchText] = useState("");

  function onSearchSubmit(event) {
    event.preventDefault();
    props.onSubmit(searchtext);
  }

  return (
    <div className="search-container">
      <form onSubmit={onSearchSubmit}>
        <div className="search-box">
          <span>
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="search-input"
            value={searchtext}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Search;
