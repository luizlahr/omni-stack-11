import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewIncident() {
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function handleInsert(e) {
    e.preventDefault();
    const values = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", values, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar, tente novamente");
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h2>Cadastrar novo caso</h2>
          <p>
            Descreva o caso detalhadamente para econtrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form>
          <input
            type="text"
            placeholder="Titulo do cas"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="text"
            placeholder="Valor em Reais (R$)"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <button className="button" type="submit" onClick={handleInsert}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
}
