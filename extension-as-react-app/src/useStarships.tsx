import { gql, useQuery } from "@apollo/client";

const STARSHIPS_QUERY = gql`
query AllStarships {
  allStarships {
    starships {
      id,
      name
    }
  }
}`;

interface Starship {
  id: string;
  name: string;
}


interface StarShipQueryResponse {
  allStarships: {
    starships: Starship[];
  };
}

export const useStarships = () => {

  const { loading, error, data } =
    useQuery<StarShipQueryResponse>(STARSHIPS_QUERY);

  return {
    loading,
    error,
    starships: data?.allStarships?.starships ?? ([] as Starship[]),
  };
};
