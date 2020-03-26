import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Header, Case, CaseList } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
  const history = useHistory();
  const [cases, setCases] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/profile", {
          headers: { Authorization: ongId }
        });
        setCases(data);
      } catch (err) {
        alert("Ocorreu um erro inesperado");
      }
    };
    fetchData();
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setCases(cases.filter(item => item.id !== id));
    } catch (err) {
      alert("Erro ao Excluir, tente novamente");
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    history.push("/");
  }

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </Header>

      <h2>Casos cadastrados</h2>

      <CaseList>
        <>
          {cases.length <= 0 && <h3>Nenhum caso cadastrado</h3>}
          {cases.map(item => {
            return (
              <Case key={item.id}>
                <strong>CASO:</strong>
                <p>
                  {item.id} -{item.title}
                </p>

                <strong>DESCRIÇÃO:</strong>
                <p>{item.description}</p>

                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(item.value)}
                </p>

                <button type="button" onClick={() => handleDelete(item.id)}>
                  <FiTrash2 size="20" color="#a8a8b3" />
                </button>
              </Case>
            );
          })}
        </>
      </CaseList>
    </Container>
  );
}
