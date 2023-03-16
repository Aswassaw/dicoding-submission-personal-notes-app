import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="note-app__header">
      <h1>
        <Link to="/">Nibiru Notes</Link>
      </h1>
      <div>
        <ul
          style={{ listStyle: "none", display: "flex", flexDirection: "row" }}
        >
          <li style={{ marginRight: "5px", marginLeft: "5px" }}>
            <Link className="large" to={"/add"}>
              Add
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
