import axios from "axios";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

interface PokeApiRequestContextData {
  pokemons: any[];
  setPokemons: Dispatch<SetStateAction<any[]>>;
  allpokemons: any[];
  setAllPokemons: Dispatch<SetStateAction<any[]>>;
  getPokemons: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface PokemonsProps {
  image: string;
  number: number;
  name: string;
  page: number;
  limit: number;
}

const PokeApiRequestContext = createContext({} as PokeApiRequestContextData);

export function PokeApiRequestProvider({ children }: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [allpokemons, setAllPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  var limit = 450;

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
        setPokemons([...res, res]);
        setAllPokemons([...res, res]);
        // setPokemons((prevPokemons) => [...prevPokemons, ...res]);
        // console.log(res);
        setLoading(true);
      });
    // console.log(endpoints);
  }, [limit]);

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
