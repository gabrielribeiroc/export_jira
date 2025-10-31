import React, { useState } from 'react';
import './App.css';
import ConnectionForm from './components/ConnectionForm';
import TicketsList from './components/TicketsList';
import { Download, Database } from 'lucide-react';

function App() {
  const [connected, setConnected] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConnectionSuccess = () => {
    setConnected(true);
  };

  const handleTicketsLoaded = (loadedTickets) => {
    setTickets(loadedTickets);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Database size={32} />
            <h1>Jira Export</h1>
          </div>
          <p className="subtitle">Extraia e organize seus tickets do Jira</p>
        </div>
      </header>

      <main className="main-content">
        {!connected ? (
          <ConnectionForm onConnectionSuccess={handleConnectionSuccess} />
        ) : (
          <TicketsList 
            onTicketsLoaded={handleTicketsLoaded}
            tickets={tickets}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>? 2025 Jira Export - Ferramenta de extra??o e organiza??o de tickets</p>
      </footer>
    </div>
  );
}

export default App;
