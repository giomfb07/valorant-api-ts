import axios from "axios";

interface Agente {
    displayName: string;
    abilities: { displayName: string }[];
    role: string;
}

interface ValorantResponse {
    data: Agente[];
}

async function consumirValorant() {
    try {
        const resposta = await axios.get<ValorantResponse>("https://valorant-api.com/v1/agents");
        const agentes = resposta.data.data;

     
        const jett = agentes.find((agent: Agente) => agent.displayName === "Jett");
        if (jett && jett.abilities.length >= 3) {
            console.log(`Terceira habilidade de Jett: ${jett.abilities[2].displayName}`);
        }

       
        const duelistCount = agentes.filter((agent: Agente) => agent.role === "Duelist").length;
        console.log(`Quantidade de agentes com a função Duelist: ${duelistCount}`);

       
        console.log("Lista de todos os agentes:");
        agentes.forEach((agent: Agente) => {
            console.log(agent.displayName);
        });

      
        console.log("Lista de habilidades (nome do agente e ultimate):");
        agentes.forEach((agent: Agente) => {
            const ultimate = agent.abilities.find((ability: { displayName: string }) =>
                ability.displayName.includes("Ultimate")
            );
            if (ultimate) {
                console.log(`${agent.displayName} - Ultimate: ${ultimate.displayName}`);
            }
        });
    } catch (error) {
        console.log("Erro ao consumir API de Valorant:", error);
    }
}

interface Digimon {
    name: string;
    level: string;
}

interface DigimonResponse {
    data: Digimon[];
}

async function consumirDigimon() {
    try {
        const resposta = await axios.get<DigimonResponse>("https://digi-api.com/api/v1/digimon");
        const digimons = resposta.data.data;

        const agumon = digimons.find((digimon: Digimon) => digimon.name === "Agumon");
        if (agumon) {
            console.log(`Nível do Agumon: ${agumon.level}`);
        }

        console.log("Digimons com nível Rookie:");
        digimons.filter((digimon: Digimon) => digimon.level === "Rookie").forEach((digimon: Digimon) => {
            console.log(`${digimon.name} - Nível: ${digimon.level}`);
        });
    } catch (error) {
        console.log("Erro ao consumir API de Digimon:", error);
    }
}

interface Pokemon {
    name: string;
}

interface PokemonResponse {
    results: Pokemon[];
}

async function consumirPokemon() {
    try {
        const resposta = await axios.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");
        const pokemons = resposta.data.results;

        const firstPokemon = pokemons[0];
        console.log(`Nome do primeiro Pokémon: ${firstPokemon.name}`);

        console.log("Pokémons do tipo Fire:");
        for (const pokemon of pokemons) {
            const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const pokeTypes: string[] = pokeData.data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name);
            if (pokeTypes.includes("fire")) {
                console.log(`${pokemon.name} - Tipos: ${pokeTypes.join(", ")}`);
            }
        }
    } catch (error) {
        console.log("Erro ao consumir API de Pokémon:", error);
    }
}

async function run() {
    console.log("Consumindo API de Valorant...");
    await consumirValorant();

    console.log("\nConsumindo API de Digimon...");
    await consumirDigimon();

    console.log("\nConsumindo API de Pokémon...");
    await consumirPokemon();
}

run();
