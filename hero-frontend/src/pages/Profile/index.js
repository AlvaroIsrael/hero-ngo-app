import React, {useState, useEffect} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  /*Executa uma funcao no parametro 1 quando algum elemento for alterado.
   Esse elemento é passado no array do parametro 2.
   Se nenhum argumento for passado em 2 a funcao 1 é
   excecutada apenas 1 vez no iniciocdo carregamento da pagina.*/
  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId,
      },
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);


  const handleDeleteIncident = async (incidentId) => {
    try {
      await api.delete(`/incidents/${incidentId}`, {
        headers: {
          Authorization: ongId,
        },
      });

      /*Apos o delete ser concluido com sucesso, para nao ser necessario
      * voltar no servidor e trazer novamente a listagem de incidentes,
      * eu posso apenas percorrer o array com is incidentes que ja havia
      * sido consutlado no início do carregamento da pagina e apenas
      * deletar o indicente que foi deletado pela API de lá. Very clever!*/
      setIncidents(incidents.filter(incident => incident.id !== incidentId));

    } catch (e) {
      alert('Algo deu errado, tente novamente!');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className={'button'} to={'/incidents/new'}>Cadastrar novo caso</Link>
        <button onClick={handleLogout} type={'button'}>
          <FiPower size={18} color={'#E02041'}/>
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map((incident) => {
          return (<li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl
              .NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
              .format(incident.value)
            }</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type={'button'}>
              <FiTrash2 size={20} color={'#a8a8b3'}/>
            </button>
          </li>);
        })}
      </ul>
    </div>
  );
}
