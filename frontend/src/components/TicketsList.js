import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketsList.css';
import { 
  Search, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  RefreshCw,
  Filter,
  ChevronUp,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function TicketsList({ onTicketsLoaded, tickets }) {
  const [allTickets, setAllTickets] = useState(tickets || []);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  
  // Ordena??o
  const [sortField, setSortField] = useState('created');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    loadProjects();
    if (allTickets.length === 0) {
      loadAllTickets();
    }
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allTickets, searchTerm, selectedProject, selectedStatus, selectedPriority, sortField, sortDirection]);

  const loadProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data.projects);
    } catch (err) {
      console.error('Erro ao carregar projetos:', err);
    }
  };

  const loadAllTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/api/tickets`, {});
      setAllTickets(response.data.tickets);
      onTicketsLoaded(response.data.tickets);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar tickets');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allTickets];

    // Aplicar filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Aplicar filtro de projeto
    if (selectedProject) {
      filtered = filtered.filter(ticket => ticket.project === selectedProject);
    }

    // Aplicar filtro de status
    if (selectedStatus) {
      filtered = filtered.filter(ticket => ticket.status === selectedStatus);
    }

    // Aplicar filtro de prioridade
    if (selectedPriority) {
      filtered = filtered.filter(ticket => ticket.priority === selectedPriority);
    }

    // Aplicar ordena??o
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'created' || sortField === 'updated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTickets(filtered);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/export/excel`, {
        tickets: filteredTickets
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `jira_tickets_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Erro ao exportar para Excel');
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/export/pdf`, {
        tickets: filteredTickets
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `jira_tickets_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Erro ao exportar para PDF');
    }
  };

  const uniqueStatuses = [...new Set(allTickets.map(t => t.status))];
  const uniquePriorities = [...new Set(allTickets.map(t => t.priority))];

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <div className="header-title">
          <h2>Tickets do Jira</h2>
          <span className="ticket-count">{filteredTickets.length} tickets encontrados</span>
        </div>
        <button onClick={loadAllTickets} className="refresh-button" disabled={loading}>
          <RefreshCw size={18} />
          {loading ? 'Carregando...' : 'Atualizar'}
        </button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por key, resumo ou descri??o..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <select 
            value={selectedProject} 
            onChange={(e) => setSelectedProject(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os Projetos</option>
            {projects.map(project => (
              <option key={project.key} value={project.key}>{project.name}</option>
            ))}
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os Status</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas as Prioridades</option>
            {uniquePriorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel} className="export-button excel">
          <FileSpreadsheet size={18} />
          Exportar Excel
        </button>
        <button onClick={exportToPDF} className="export-button pdf">
          <FileText size={18} />
          Exportar PDF
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('key')}>
                Key <SortIcon field="key" />
              </th>
              <th onClick={() => handleSort('summary')}>
                Resumo <SortIcon field="summary" />
              </th>
              <th onClick={() => handleSort('status')}>
                Status <SortIcon field="status" />
              </th>
              <th onClick={() => handleSort('priority')}>
                Prioridade <SortIcon field="priority" />
              </th>
              <th onClick={() => handleSort('assignee')}>
                Respons?vel <SortIcon field="assignee" />
              </th>
              <th onClick={() => handleSort('issue_type')}>
                Tipo <SortIcon field="issue_type" />
              </th>
              <th onClick={() => handleSort('created')}>
                Criado em <SortIcon field="created" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {loading ? 'Carregando tickets...' : 'Nenhum ticket encontrado'}
                </td>
              </tr>
            ) : (
              filteredTickets.map(ticket => (
                <tr key={ticket.key}>
                  <td className="ticket-key">{ticket.key}</td>
                  <td className="ticket-summary">{ticket.summary}</td>
                  <td>
                    <span className={`badge status-${ticket.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>{ticket.assignee}</td>
                  <td>{ticket.issue_type}</td>
                  <td>{new Date(ticket.created).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketsList;
