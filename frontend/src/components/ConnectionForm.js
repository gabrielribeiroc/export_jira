import React, { useState } from 'react';
import axios from 'axios';
import './ConnectionForm.css';
import { Link, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function ConnectionForm({ onConnectionSuccess }) {
  const [formData, setFormData] = useState({
    jira_url: '',
    email: '',
    api_token: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_URL}/api/connect`, formData);
      setSuccess('Conex?o estabelecida com sucesso!');
      setTimeout(() => {
        onConnectionSuccess();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao conectar ao Jira. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connection-form-container">
      <div className="connection-card">
        <div className="card-header">
          <Lock size={48} className="header-icon" />
          <h2>Conectar ao Jira</h2>
          <p>Insira suas credenciais para come?ar</p>
        </div>

        <form onSubmit={handleSubmit} className="connection-form">
          <div className="form-group">
            <label htmlFor="jira_url">
              <Link size={18} />
              URL do Jira
            </label>
            <input
              type="text"
              id="jira_url"
              name="jira_url"
              value={formData.jira_url}
              onChange={handleChange}
              placeholder="https://sua-empresa.atlassian.net"
              required
            />
            <small>Ex: https://sua-empresa.atlassian.net</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu-email@exemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="api_token">
              <Lock size={18} />
              Token API
            </label>
            <input
              type="password"
              id="api_token"
              name="api_token"
              value={formData.api_token}
              onChange={handleChange}
              placeholder="Seu token de API do Jira"
              required
            />
            <small>
              <a 
                href="https://id.atlassian.com/manage-profile/security/api-tokens" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Criar um token API
              </a>
            </small>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Conectando...' : 'Conectar'}
          </button>
        </form>

        <div className="help-section">
          <h3>Como obter o Token API?</h3>
          <ol>
            <li>Acesse sua conta Atlassian</li>
            <li>V? em "Configura??es" ? "Seguran?a"</li>
            <li>Clique em "Criar e gerenciar tokens API"</li>
            <li>Crie um novo token e copie-o</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ConnectionForm;
