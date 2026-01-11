export interface Ability {
  slot: string;          
  displayName: string;   
  description: string;   
  icon: string | null;   
}


export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  fullPortrait: string;
  isPlayableCharacter: boolean;
  abilities: Ability[];
}

export interface ValorantApiResponse {
  status: number;
  data: Agent[];
}
