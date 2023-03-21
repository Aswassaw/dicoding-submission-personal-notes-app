import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";
import Header from "./../components/Header";

function Login({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <>
      <Header />
      <div className="note-app__body">
        <section className="login-page">
          <h2>Silahkan login untuk mengakses aplikasi</h2>
          <LoginInput login={onLogin} />
          <p>
            Belum punya akun? <Link to="/register">Register di sini.</Link>
          </p>
        </section>
      </div>
    </>
  );
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default Login;
