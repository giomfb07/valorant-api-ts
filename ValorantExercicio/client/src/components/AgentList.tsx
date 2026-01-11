import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgentList.css";

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description?: string;
  fullPortrait: string;
  isPlayableCharacter: boolean;
  abilities?: Ability[];
}

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get<Agent[]>(
          "http://localhost:3001/agents"
        );
        setAgents(response.data);
      } catch (err) {
        setError(
          "Erro ao carregar os agentes. Verifique se o servidor está rodando."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) {
    return <div className="status-message">Carregando agentes...</div>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  if (agents.length === 0) {
    return <div className="status-message">Nenhum agente encontrado.</div>;
  }

  return (
    <div className="agent-list-container">
      <h1>Agentes do VALORANT</h1>
      <div className="agent-grid">
        {agents.map((agent) => (
          <div key={agent.uuid} className="agent-card">
            <img
              src={agent.fullPortrait}
              alt={agent.displayName}
              className="agent-portrait"
            />
            <div className="agent-info">
              <h2>{agent.displayName}</h2>
              {agent.description && (
                <p className="agent-description">{agent.description}</p>
              )}
              {agent.abilities && agent.abilities.length > 0 && (
                <div className="abilities-container">
                  <h3>Habilidades</h3>
                  <ul className="abilities-list">
                    {agent.abilities.map((ability, index) => (
                      <li key={index} className="ability-item">
                        {ability.displayIcon && (
                          <img
                            src={ability.displayIcon}
                            alt={ability.displayName}
                            className="ability-icon"
                          />
                        )}
                        <p className="ability-name">{ability.displayName}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
