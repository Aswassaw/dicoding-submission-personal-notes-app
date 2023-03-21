import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

function Register() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const result = await register(user);

    if (!result.error) {
      navigate("/");
    }
  }

  return (
    <>
      <Header />
      <div className="note-app__body">
        <section className="register-page">
          <h2>Silahkan register untuk mengakses aplikasi</h2>
          <RegisterInput register={onRegisterHandler} />
          <p>
            Kembali ke <Link to="/">Login</Link>
          </p>
        </section>
      </div>
    </>
  );
}

export default Register;
