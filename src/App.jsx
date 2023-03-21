import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import LocaleContext from "./contexts/LocaleContext";
import { getUserLogged, putAccessToken } from "./utils/api";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [authData, setAuthData] = useState({
    user: null,
    initializing: true,
  });
  const [themeData, setThemeData] = useState("light");

  useEffect(() => {
    async function init() {
      const { data } = await getUserLogged();

      setAuthData(() => ({ user: data, initializing: false }));
    }

    init();

    if (localStorage.getItem("theme")) {
      setThemeData(localStorage.getItem("theme"));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData);
  }, [themeData]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthData((prevState) => {
      return {
        ...prevState,
        user: data,
      };
    });
  };

  const onLogout = () => {
    setAuthData((prevState) => {
      return {
        ...prevState,
        user: null,
      };
    });
    putAccessToken("");
  };

  const toggleTheme = () => {
    setThemeData((prevState) => (prevState === "light" ? "dark" : "light"));

    localStorage.setItem("theme", themeData === "light" ? "dark" : "light");
  };

  if (authData.initializing) {
    return null;
  }

  if (authData.user === null) {
    return (
      <LocaleContext.Provider
        value={{
          authData,
          themeData,
          toggleTheme,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider
      value={{
        authData,
        themeData,
        toggleTheme,
        onLogout,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LocaleContext.Provider>
  );
}
