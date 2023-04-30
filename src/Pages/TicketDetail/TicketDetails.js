import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketDetailsBox from '../../Componentes/DetalhesCliente/TicketDetailsBox';
import TicketDetailsPedido from '../../Componentes/DetalhesPedido/TicketDetailsPedido';
import './TicketDetails.css';
import exportedObject from '../../Services/Common/TicketAPI';
import exportedMessage from '../../Services/Common/MessageAPI';
import TopNavBar from '../../Componentes/TopNavBar/TopNavBar';
import DetalhesPagamento from '../../Componentes/DetalhesPagamento/DetalhesPagamento';
import { PagamentoContext } from '../../Store/pagamentoContext';
import { EntregaContext } from '../../Store/entregaContext';
import DetalhesEntrega from '../../Componentes/DetalhesEntrega/DetalhesEntrega';

const TicketDetails = () => {
  const { id } = useParams(); // Obtém o valor do parâmetro "id" da URL

  const [ticket, setTicket] = useState({});
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  //receber a requisicao para renderizar os detalhes pagamento
  const context = useContext(PagamentoContext);
  const pagamentoComponente = context.pagamentoButton
  console.log('PagamentoComponente', pagamentoComponente)

  //receber a requisicao para renderizar os detalhes entrega
  const entregaContext = useContext(EntregaContext);
  const entregaComponente = entregaContext.entregaButton;
  console.log('EntregaComponente',entregaComponente)

  useEffect(() => {
    async function fetchTicketAndMessages() {
      try {
        const [ticketResponse, messageResponse] = await Promise.all([
          exportedObject.getTicketID(id),
          exportedMessage.getMessageID(id)
        ]);
        setTicket(ticketResponse.data);
        setMessage(messageResponse.data.Mensagem);
      } catch (error) {
        console.error(error);
        alert('Nenhum registro encontrado! Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTicketAndMessages();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>
  }


  const handleNewMessageSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await exportedMessage.postMessage(id, newMessage);
      setMessage([...message, response.data.Mensagem[0]]);
      setNewMessage('');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar mensagem! Tente novamente mais tarde.');
    }
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  if(pagamentoComponente === 'rotaPagamento'){
    return (
      <div className='containerPrincipal'>
        <h1 className="title">{ticket.Assunto} - {id}</h1>
        <TopNavBar />
        <div>
          <DetalhesPagamento ticket={ticket}/>
        </div>
        <div>
          <TicketDetailsBox ticket={ticket} />
          <TicketDetailsPedido ticket={ticket} />
        </div>
      </div>
    );
  } else if (entregaComponente === 'rotaEntrega') {
    return (
      <div className='containerPrincipal'>
        <h1 className="title">{ticket.Assunto} - {id}</h1>
        <TopNavBar />
        <div>
          <DetalhesEntrega ticket={ticket}/>
        </div>
        <div>
          <TicketDetailsBox ticket={ticket} />
          <TicketDetailsPedido ticket={ticket} />
        </div>
      </div>
    );
  }else {
  return (
    <div className='containerPrincipal'>
      <h1 className="title">{ticket.Assunto} - {id}</h1>
      <TopNavBar />
      <div className="messages-container">
        {message.map((msg, index) => (
          <div className="message" key={index}>
            {msg}
          </div>
        ))}
      </div>
      <div>
        <form className="new-message-container" onSubmit={handleNewMessageSubmit}>
          <input type="text" value={newMessage} onChange={handleNewMessageChange} />
          <button type="submit">Enviar</button>
        </form>
        <TicketDetailsBox ticket={ticket} />
        <TicketDetailsPedido ticket={ticket} />
      </div>
    </div>
  ); }
}

export default TicketDetails;