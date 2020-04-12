import React from 'react';
import {Image, Text, View, TouchableOpacity, Linking} from 'react-native';
import css from './styles';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateBack = () => {
    navigation.goBack();
  };

  /*Parametro recebido atraves da funcao [navigateToDetail] da tela [incident].*/
  const incident = route.params.incident;
  const ajudaValor = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value);
  const message = `Olá ${incident.name},e stou entrando em contato porque gostaria de ajudar' +
    'no caso "${incident.title}" com o valor de ${ajudaValor}.`;

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  };

  const sendWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  };

  return (
    <View style={css.container}>
      <View style={css.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name={'arrow-left'} size={28} color={'#e82041'}/>
        </TouchableOpacity>
      </View>

      <View style={css.incident}>
        <Text style={[css.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text
          style={css.incidentValue}>{incident.name.toUpperCase()} de {incident.city.toUpperCase()}/{incident.uf.toUpperCase()}</Text>

        <Text style={css.incidentProperty}>CASO:</Text>
        <Text style={css.incidentValue}>{incident.title}</Text>

        <Text style={css.incidentProperty}>VALOR:</Text>
        <Text style={css.incidentValue}>{
          Intl
            .NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
            .format(incident.value)}
        </Text>
      </View>
      <View style={css.contactBox}>
        <Text style={css.heroTitle}>Salve o dia!</Text>
        <Text style={css.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={css.heroDescription}>Entre em contato:</Text>

        <View style={css.actions}>
          <TouchableOpacity style={css.action} onPress={sendWhatsApp}>
            <Text style={css.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={css.action} onPress={sendMail}>
            <Text style={css.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
