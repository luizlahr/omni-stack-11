import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const values = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const { data } = await api.post("/ongs", values);
      alert(`Seu ID ${data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro tente novamente");
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h2>Cadastro</h2>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os cados da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft color="#E02041" />
            Já sou cadastrado
          </Link>
        </section>

        <form>
          <input
            type="text"
            placeholder="Nome da ONG"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            onChange={e => setWhatsapp(e.target.value)}
            value={whatsapp}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              onChange={e => setCity(e.target.value)}
              value={city}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: "80px" }}
              onChange={e => setUf(e.target.value)}
              value={uf}
            />
          </div>
          <button className="button" type="submit" onClick={handleRegister}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
}
