import { IPokemon, IPokemonInfoProps } from "@/interface";
import axios from "axios";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface PokeApiRequestContextData {
  pokemons: IPokemon[];
  setPokemons: Dispatch<SetStateAction<any[]>>;
  allpokemons: any[];
  setAllPokemons: Dispatch<SetStateAction<any[]>>;
  getPokemons: (start: number, end?: number) => Promise<any[]>;
  getEvolutionChain: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  evolutionChain: IPokemonInfoProps;
  setEvolutionChain: Dispatch<any>;
  evolutionChainURLId: string;
  setEvolutionChainURLId: Dispatch<any>;
  pokemonEvolution: [];
  setPokemonEvolution: Dispatch<any>;
  uniquePokemon: IPokemon;
  setUniquePokemon: Dispatch<any>;
  previusAndNextPokemon: IPokemonInfoProps[];
  setPreviusAndNextPokemon: Dispatch<any>;
  getNextAndPreviusPokemon: () => void;
  id: number;
  setId: Dispatch<SetStateAction<number>>;
  // limit: number;
  // setLimit: Dispatch<SetStateAction<number>>;
  newData: any[];
  setNewData: Dispatch<SetStateAction<any[]>>;
}

export interface PokemonsProps {
  image: string;
  number: number;
  name: string;
  page: number;
  limit: number;
}

export const PokeApiRequestContext = createContext(
  {} as PokeApiRequestContextData
);

export function PokeApiRequestProvider({ children }: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [allpokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState<any>([]);
  const [pokemonEvolution, setPokemonEvolution] = useState<any>([]);
  const [evolutionChainURLId, setEvolutionChainURLId] = useState<any>([]);
  const [uniquePokemon, setUniquePokemon] = useState<any>([]);
  const [previusAndNextPokemon, setPreviusAndNextPokemon] = useState<any>([]);
  const [id, setId] = useState(0);
  // const [limit, setLimit] = useState(1);
  const [newData, setNewData] = useState<any[]>([]);

  // var limit = 33;

  const getPokemons = useCallback(async (start: number, end?: number) => {
    let endpoints = [];
    end = end || start + 31;

    for (let i = start; i <= end; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    const response = await Promise.all(
      endpoints.map(async (endpoint) => {
        const { data } = await axios.get(endpoint);
        return data;
      })
    );

    return response;
  }, []);

  // const getEvolutionChain = useCallback(async () => {
  //   const { data } = await axios.get<IPokemonInfoProps>(
  //     `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainURLId}`
  //   );
  //   console.log(data);
  //   return data;
  // }, [evolutionChainURLId]);

  const getEvolutionChain = useCallback(async () => {
    setLoading(false);

    try {
      const response = await axios.get<IPokemonInfoProps>(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainURLId}`
      );

      if (response.data && response.data.chain) {
        setEvolutionChain(response.data);
        let idPokemonsEvolutions: any = [];
        const chain = response.data.chain;

        function extractIdFromUrl(url: any) {
          return url.replace("https://pokeapi.co/api/v2/pokemon-species/", "");
        }

        if (chain) {
          idPokemonsEvolutions.push(extractIdFromUrl(chain.species.url));

          if (chain.evolves_to && chain.evolves_to.length > 0) {
            idPokemonsEvolutions.push(
              chain.evolves_to.map((res) => extractIdFromUrl(res.species.url))
            );
          }

          if (chain.evolves_to && chain.evolves_to[0]?.evolves_to.length >= 1) {
            idPokemonsEvolutions.push(
              chain.evolves_to.map((res) =>
                res.evolves_to.map((res) => extractIdFromUrl(res.species.url))
              )
            );
          }

          console.log("aqqqqq", idPokemonsEvolutions);

          function getEvolutionChainImages(ids: []) {
            const urlPokemonEvolutions = ids.map((id: string) =>
              axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );

            return axios.all(urlPokemonEvolutions).then((res) => {
              const pokemonEvolutionImages = res.map((pokemon) => {
                if (pokemon.data.id < 650) {
                  return pokemon.data.sprites.other.dream_world.front_default;
                }
                if (pokemon.data.id >= 650) {
                  if (pokemon.data.id !== 1013) {
                    return pokemon.data.sprites.other["official-artwork"]
                      .front_default;
                  } else {
                    return pokemon.data.sprites.front_default;
                  }
                }
              });
              setPokemonEvolution(pokemonEvolutionImages);
            });
          }

          let idsToFetch: any = [];
          if (idPokemonsEvolutions[1]?.length > 1) {
            idsToFetch.push(
              idPokemonsEvolutions[0],
              ...idPokemonsEvolutions[1]
            );
            console.log(idsToFetch);
            getEvolutionChainImages(idsToFetch);
          } else if (idPokemonsEvolutions?.[2]?.[0]?.length > 1) {
            idsToFetch.push(
              idPokemonsEvolutions[0],
              ...idPokemonsEvolutions[1],
              ...idPokemonsEvolutions[2][0]
            );
            getEvolutionChainImages(idsToFetch);
          } else {
            getEvolutionChainImages(idPokemonsEvolutions);
          }
          if (idPokemonsEvolutions?.[2].length > 1) {
            const checkPokemonAllReadyFetch = idsToFetch.filter((item: any[]) =>
              idPokemonsEvolutions.includes(item)
            );
            if (checkPokemonAllReadyFetch) {
              idsToFetch.push(
                ...idPokemonsEvolutions[2][0],
                ...idPokemonsEvolutions[2][1]
              );
              getEvolutionChainImages(idsToFetch);
            }
          }
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Certifique-se de definir setLoading como verdadeiro em caso de erro
      setLoading(true);
    }
  }, [evolutionChainURLId, setEvolutionChain, setPokemonEvolution]);

  const getNextAndPreviusPokemon = useCallback(async () => {
    var endpoints = [];
    if (uniquePokemon?.id) {
      if (uniquePokemon?.id !== 1) {
        endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon?.id - 1}/`,
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon?.id + 1}/`
        );
      } else {
        endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon?.id + 1}/`
        );
      }

      var response = await axios.all(
        endpoints.map((endpoint) => axios.get<PokemonsProps>(endpoint))
      );

      setPreviusAndNextPokemon(response);
      // setLoading(true);
    }
  }, [uniquePokemon?.id]);

  return (
    <PokeApiRequestContext.Provider
      value={{
        pokemons,
        setPokemons,
        allpokemons,
        setAllPokemons,
        getPokemons,
        loading,
        setLoading,
        evolutionChain,
        setEvolutionChain,
        pokemonEvolution,
        setPokemonEvolution,
        getEvolutionChain,
        evolutionChainURLId,
        setEvolutionChainURLId,
        uniquePokemon,
        setUniquePokemon,
        previusAndNextPokemon,
        setPreviusAndNextPokemon,
        getNextAndPreviusPokemon,
        id,
        setId,
        // limit,
        // setLimit,
        newData,
        setNewData,
      }}
    >
      {children}
    </PokeApiRequestContext.Provider>
  );
}

export function usePokeApiRequest() {
  const context = useContext(PokeApiRequestContext);

  if (!context) {
    throw new Error(
      "usePokeApiRequest must be used within an a PokeApiRequestProvider"
    );
  }
  return context;
}
