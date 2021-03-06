import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadIncidents = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && dataList.length === total) {
      return;
    }

    setLoading(true);

    const { data, headers } = await api.get("incidents", {
      params: { page }
    });

    setDataList([...dataList, ...data]);
    setTotal(headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      <FlatList
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.1}
        data={dataList}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        // showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>
              {incident.name} de {incident.city}/{incident.uf}
            </Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
