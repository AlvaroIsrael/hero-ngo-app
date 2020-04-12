import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import css from './styles';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';

export default function Incident() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    /*O parametro e é eviado para segunda tela
    * de modo que caso eu quisesse enviar outras
    * informacoes, poderia fazer o seguinte:
    * {incident, a: 2} por exemplo, sendo que o item 'a'
    * seria acessivel na outra tela. */
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {

    /*Previne multiplas requisições simultaneas.*/
    if (loading) {
      return;
    }

    /*Não tenta carregar se já cheguei ao final da lista.*/
    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    await api.get('/incidents', {params: {page}})
      .then(response => {
        setIncidents([...incidents, ...response.data['incidents']]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={css.container}>
      <View style={css.header}>
        <Image source={logoImg}/>
        <Text style={css.headerText}>
          Total de <Text style={css.headersTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={css.title}>Bem vindo!</Text>
      <Text style={css.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        keyExtractor={incident => String(incident.id)}
        style={css.incidentList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        data={incidents}
        renderItem={({item: incident}) => {
          return (<View style={css.incident}>
            <Text style={css.incidentProperty}>ONG:</Text>
            <Text style={css.incidentValue}>{incident.name}</Text>

            <Text style={css.incidentProperty}>CASO:</Text>
            <Text style={css.incidentValue}>{incident.title}</Text>

            <Text style={css.incidentProperty}>VALOR:</Text>
            <Text style={css.incidentValue}>{
              Intl
                .NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                .format(incident.value)}
            </Text>
            <TouchableOpacity
              style={css.detailsButton}
              onPress={() => navigateToDetail(incident)}>
              <Text style={css.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name={'arrow-right'} size={16} color={'#E02041'}/>

            </TouchableOpacity>
          </View>);
        }}/>
    </View>
  );
}
