export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  moves: Move[];
  stats: Stat[];
  sprites: Sprites;
  abilities: Ability[];
}

interface Type {
  type: { name: string };
}

interface Move {
  move: { name: string };
}

interface Ability {
  ability: { name: string };
}

interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface Sprites {
  front_default: string;
}
