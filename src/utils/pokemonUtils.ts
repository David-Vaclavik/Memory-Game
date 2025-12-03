import type { Pokemon } from "../components/Cards";

// Generates an array of unique random IDs within a range
// Used to select random Pokemon from the API (1-386 are Gen 1-3 Pokemon)
function generateUniqueIds(count: number, max: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

// Creates initial state structure for pokemon array
// Each pokemon starts with an ID, clicked status, and null data (to be fetched)
//* count - number of pokemon cards to show
//* maxId - ids of pokemons to choose from
export function generateInitialState(count: number, maxId: number = 386): Pokemon[] {
  const uniqueIds = generateUniqueIds(count, maxId);
  return uniqueIds.map((id) => ({
    id: id,
    clicked: false,
    data: null,
  }));
}

// Pokémon generation ID ranges
export const POKEMON_GENS = {
  GEN_1: { min: 1, max: 151 }, // Kanto (Red/Blue/Yellow)
  GEN_2: { min: 152, max: 251 }, // Johto (Gold/Silver/Crystal)
  GEN_3: { min: 252, max: 386 }, // Hoenn (Ruby/Sapphire/Emerald)
  GEN_4: { min: 387, max: 493 }, // Sinnoh (Diamond/Pearl/Platinum)
  GEN_5: { min: 494, max: 649 }, // Unova (Black/White)
  GEN_6: { min: 650, max: 721 }, // Kalos (X/Y)
  GEN_7: { min: 722, max: 809 }, // Alola (Sun/Moon)
  GEN_8: { min: 810, max: 905 }, // Galar (Sword/Shield)
  GEN_9: { min: 906, max: 1025 }, // Paldea (Scarlet/Violet)
};
