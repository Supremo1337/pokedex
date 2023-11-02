import { IPokemonInfoProps } from "@/interface";
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
  pokemons: any[];
  setPokemons: Dispatch<SetStateAction<any[]>>;
  allpokemons: any[];
  setAllPokemons: Dispatch<SetStateAction<any[]>>;
  getPokemons: (start: number, end?: number) => Promise<any[]>;
  getEvoluionChain: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  evolutionChain: IPokemonInfoProps;
  setEvolutionChain: Dispatch<any>;
  evolutionChainURLId: string;
  setEvolutionChainURLId: Dispatch<any>;
  pokemonEvolution: [];
  setPokemonEvolution: Dispatch<any>;
  uniquePokemon: IPokemonInfoProps;
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
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [allpokemons, setAllPokemons] = useState<any[]>([]);
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
    end = end || start + 9;

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
    // return axios
    //   .all(
    //     endpoints.map(
    //       async (endpoint) => await axios.get<PokemonsProps>(endpoint)
    //     )
    //   )
    //   .then((res) => {
    //     setPokemons(res);
    //     setAllPokemons(res);
    //     setLoading(true);
    //     return res;
    //   });
  }, []);

  const getEvoluionChain = useCallback(async () => {
    setLoading(false);

    try {
      const response = await axios.get<IPokemonInfoProps>(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainURLId}`
      );

      if (response.data && response.data.chain) {
        setEvolutionChain(response.data);
        let namePokemonsEvolutions: any[] = [];
        const chain = response.data.chain;

        if (chain) {
          namePokemonsEvolutions.push(chain.species.name);

          if (chain.evolves_to && chain.evolves_to.length > 0) {
            namePokemonsEvolutions.push(
              chain.evolves_to.map((res) => res.species.name)
            );

            console.log(chain.evolves_to.map((res) => res.evolves_to));
          }
          if (chain.evolves_to && chain.evolves_to[0]?.evolves_to.length >= 1) {
            namePokemonsEvolutions.push(
              chain.evolves_to.map((res) =>
                res.evolves_to.map((res) => res.species.name)
              )
            );
          }

          if (namePokemonsEvolutions[1]?.length > 1) {
            const urlPokemonEvolutionsRest = [
              namePokemonsEvolutions[0],
              ...namePokemonsEvolutions[1],
            ].map((name: string) =>
              axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            );

            axios.all(urlPokemonEvolutionsRest).then((res) => {
              const pokemonEvolutionImages = res.map(
                (res: any) => res.data.sprites.other.dream_world.front_default
              );
              setPokemonEvolution(pokemonEvolutionImages);
            });
          } else {
            const urlPokemonEvolutions = namePokemonsEvolutions.map((name) =>
              axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            );

            axios.all(urlPokemonEvolutions).then((res) => {
              const pokemonEvolutionImages = res.map(
                (res) => res.data.sprites.other.dream_world.front_default
              );
              setPokemonEvolution(pokemonEvolutionImages);

              setLoading(true);
              // console.log("aqqqq");
            });
          }
        }
      } else {
        // setLoading(true);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Certifique-se de definir setLoading como verdadeiro em caso de erro
      setLoading(true);
    }
  }, [evolutionChainURLId, setEvolutionChain, setPokemonEvolution]);

  const getNextAndPreviusPokemon = useCallback(async () => {
    var endpoints = [];
    if (uniquePokemon.data?.id) {
      if (uniquePokemon.data?.id !== 1) {
        endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id - 1}/`,
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      } else {
        endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      }

      var response = await axios.all(
        endpoints.map((endpoint) => axios.get<PokemonsProps>(endpoint))
      );

      setPreviusAndNextPokemon(response);
      // setLoading(true);
    }
  }, [uniquePokemon.data?.id]);

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
        getEvoluionChain,
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
