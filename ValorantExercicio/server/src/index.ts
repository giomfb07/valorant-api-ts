import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { Agent, ValorantApiResponse } from "./types";

const app = express();
const PORT = 3001;

app.use(cors());

// AQUI ESTÁ O DESAFIO
// Quero que você retorne A descrição do personagem e as habilidades
app.get("/agents", async (req: Request, res: Response) => {
  try {
    const valorantResponse = await axios.get<ValorantApiResponse>(
      "https://valorant-api.com/v1/agents"
    );

    const agents = valorantResponse.data.data;
    const playableAgents = agents.filter(
      (agent) => agent.isPlayableCharacter && agent.fullPortrait
    );

   const Agents = playableAgents.map((agent) => ({
  uuid: agent.uuid,
  displayName: agent.displayName,
  description: agent.description, 
  abilities: agent.abilities,
  fullPortrait: agent.fullPortrait,
}));


    return res.json(Agents);
  } catch (error) {
    console.error("Erro ao buscar dados da API do Valorant:", error);
    return res.status(500).json({ error: "Erro ao buscar dados dos agentes." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
