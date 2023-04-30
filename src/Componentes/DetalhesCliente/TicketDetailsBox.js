import React from 'react';
import './TicketDetailsBox.css';

const TicketDetailsBox = (props) => {
    const { ticket } = props;

    return (
        <div className="ticket-details-box">
            <div className='ticket-details-box-header'>
                <h2>Detalhes Cliente</h2>
            </div>
            <div className='custom'>
                <div className="row">
                    <div className="col">
                        <div><strong>Ticket:</strong>{props.ticket.id}</div>
                    </div>
                    <div className="col">
                        <div><strong>{props.ticket.Status}</strong></div>
                    </div>
                </div>
                <div className='row' >
                    <div className='custom'><strong>Atendente: </strong> {props.ticket.Atribuido}</div>
                </div>
                <div className="row">

                    <div><strong>Cliente:</strong>{props.ticket.Nome}</div>
                </div>
                <div className="row">
                    <div><strong>E-mail:</strong>{props.ticket.Email}</div>
                </div>

                <div className="row">
                    <div><strong>Telefone:</strong>{props.ticket.Telefone}</div>
                </div>

                <div className="row">

                    <div><strong>Data de Abertura:</strong>{props.ticket.DataAbertura}</div>
                </div>

                <div className="row">
                    <div><strong>SLA:</strong>{props.ticket.SLA}</div>
                </div>
            </div>

            <div className="buttons-container">
                <button className="call-button">
                    <i className="fas fa-phone"></i>
                    Ligar Cliente
                </button>
                <button className="chat-button">
                    <i className="fas fa-comments"></i>
                    Chat Online
                </button>
            </div>
        </div >
    );
}

export default TicketDetailsBox;
