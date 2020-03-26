import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { Container, Form } from "./styles";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const history = useHistory();
  const [id, setId] = useState("");

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth", { id });
      localStorage.setItem("ongName", data.name);
      localStorage.setItem("ongId", data.id);
      history.push("/profile");
    } catch (err) {
      alert("Erro ao logar, tente novamente");
    }
  }
  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="Be The Hero" className="logo" />

        <Form>
          <h2>Faça seu logon</h2>
          <input
            type="text"
            placeholder="Sua ID"
            onChange={e => setId(e.target.value)}
            value={id}
          />
          <button className="button" type="submit" onClick={handleLogon}>
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn color="#E02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>
      <img src={heroesImg} alt="Heroes" className="heroes" />
    </Container>
  );
}
