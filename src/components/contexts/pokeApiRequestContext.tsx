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
  getPokemons: () => void;
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

  var limit = 33;

  const getPokemons = useCallback(() => {
    setLoading(false);
    var endpoints = [];

    for (var i = 1; i < limit; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    var response = axios
      .all(
        endpoints.map(
          async (endpoint) => await axios.get<PokemonsProps>(endpoint)
        )
      )
      .then((res) => {
        // setPokemons([...res, res]);
        // setAllPokemons([...res, res]);
        // setPokemons((prevPokemons) => [...prevPokemons, ...res]);
        // setAllPokemons((prevAllPokemons) => [...prevAllPokemons, ...res]);
        setPokemons(res);
        setAllPokemons(res);
        // setPokemons((prevPokemons) => [...prevPokemons, ...res]);
        // console.log(res);
        setLoading(true);
      });
    // console.log(endpoints);
  }, [limit]);

  // useEffect(() => {
  //   getPokemons();
  // }, [getPokemons]);

  const getEvoluionChain = useCallback(async () => {
    setLoading(false);
    const response = await axios
      .get<IPokemonInfoProps>(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainURLId}`
      )
      .then((res) => {
        if (res.data && res.data.chain) {
          setEvolutionChain(res);
          let namePokemonsEvolutions: any[] = [];
          const chain = res.data.chain;

          if (chain) {
            namePokemonsEvolutions.push(chain.species.name);

            if (chain.evolves_to && chain.evolves_to.length > 0) {
              namePokemonsEvolutions.push(
                chain.evolves_to.map((res) => res.species.name)
              );
            }
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

              setLoading(true);
              // console.log("aqqqq");
            });
            // console.log(namePokemonsEvolutions[0]);

            ("fluxo do slowpoke");
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
            ("fluxonormal");
          }
        } else {
          setLoading(true);
        }
      });
  }, [evolutionChainURLId, setLoading, setEvolutionChain, setPokemonEvolution]);

  const getNextAndPreviusPokemon = useCallback(async () => {
    setLoading(false);
    var endpoints = [];
    if (uniquePokemon.data?.id) {
      if (uniquePokemon.data?.id !== 1) {
        await endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id - 1}/`,
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      } else {
        await endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      }

      var response = axios
        .all(
          endpoints.map(
            async (endpoint) => await axios.get<PokemonsProps>(endpoint)
          )
        )
        .then((res) => {
          setPreviusAndNextPokemon(res);
          setLoading(true);
        });
    }
  }, [setLoading, uniquePokemon.data?.id]);

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
