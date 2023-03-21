import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

export default function Header() {
  const { authData, onLogout, toggleTheme } = useContext(LocaleContext);

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
            <p
              className="large"
              style={{ cursor: "pointer" }}
              onClick={() => toggleTheme()}
            >
              Dark Mode
            </p>
          </li>
          {authData.user ? (
            <>
              <li style={{ marginRight: "5px", marginLeft: "5px" }}>
                <Link className="large" to={"/add"}>
                  Add
                </Link>
              </li>
              <li style={{ marginRight: "5px", marginLeft: "5px" }}>
                <p
                  className="large"
                  style={{ cursor: "pointer" }}
                  onClick={() => onLogout()}
                >
                  Logout
                </p>
              </li>
            </>
          ) : (
            <>
              <li style={{ marginRight: "5px", marginLeft: "5px" }}>
                <Link className="large" to={"/"}>
                  Login
                </Link>
              </li>
              <li style={{ marginRight: "5px", marginLeft: "5px" }}>
                <Link className="large" to={"/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
