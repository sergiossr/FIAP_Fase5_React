import React, { useEffect, useState, useRef, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, Link } from 'react-router-dom';
import exportedObject from '../../Services/Common/TicketAPI';
import { StatusContext } from '../../Store/statusContext';

//estilizacao da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    cursor: 'pointer',
  },
}));


export default function CustomizedTables() {
  const navigate = useNavigate(); // obtém o objeto de navegação do React Router
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const context = useContext(StatusContext); //context para receber o filtro da tabela vinda da TopNavBar
  const status = context.statusNavBar


  const handleRowClick = (id) => {
    navigate(`/home/ticket/${id}`); // navega para a rota de detalhes do ticket com o ID correspondente
  };
  //recupera todos os ticktes
  async function getAllData() {

    await exportedObject.getTicket()
      .then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.log(error);
        alert('nenhum registro encontrado! tente novamente mais tarde')
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const filteredTickets = filterTickets(status);
    setFilteredData(filteredTickets);
  }, [status, data]);

  //filtrar de acordo com o status enviado pelo context da TopNavBar
  function filterTickets(status) {

    let filteredTickets = [...data];
    if (status === 'Pendente') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.Status === 'Pendente'
      );
    } else if (status === 'EM ATENDIMENTO') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.Status === 'EM ATENDIMENTO'
      );
    } else if (status === 'CONCLUIDO') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.Status === 'CONCLUIDO'
      );
    } else {
      filteredTickets = [...data];
    }
    //filteredTickets.sort((a, b) => new Date(b.DataAbertura) - new Date(a.DataAbertura));
    return filteredTickets;
  }
  console.log('apos o filtro', filteredData)

  return (
    <div className='ticketContainer'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Assunto</StyledTableCell>
              <StyledTableCell align="right">Atribuido</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Data de Abertura</StyledTableCell>
              <StyledTableCell align="right">SLA</StyledTableCell>
              <StyledTableCell align="right">Cliente</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((ticket) => (
              <StyledTableRow key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/home/ticket/${ticket.id}`}>{ticket.Assunto}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{ticket.Atribuido}</StyledTableCell>
                <StyledTableCell align="right">
                  <span style={{ color: ticket.Status === 'Pendente' ? 'blue' : ticket.Status === 'EM ATENDIMENTO' ? 'orange' : ticket.Status === 'CONCLUIDO' ? 'green' : 'balck'}}>
                    {ticket.Status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right">{ticket.DataAbertura}</StyledTableCell>
                <StyledTableCell align="right">{ticket.SLA}</StyledTableCell>
                <StyledTableCell align="right">{ticket.Nome}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
