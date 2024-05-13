import { gql, useQuery } from "@apollo/client";

const STARSHIPS_QUERY = gql`
  query allstarships {
    allStarships() {
        starships {
            id
            name
        }
    }
  }
`;

interface Starship {
  id: string;
  name: string;
}

type Starships = Starship[];

interface StarShipQueryResponse {
  allStarships: {
    starships: Starship[];
  };
}

export const useStarships = () => {
  const { loading, error, data } =
    useQuery<StarShipQueryResponse>(STARSHIPS_QUERY);

  console.log(data);

  return {
    loading,
    error,
    starships: data?.allStarships?.starships ?? ([] as Starships),
  };
};
