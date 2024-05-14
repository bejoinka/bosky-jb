import { gql, useQuery } from "@apollo/client";

const STARSHIPS_QUERY = gql`
query Pathways {
  pathways(pagination: { offset: 0, count: 5 }) {
    code
    success
    pathways {
      id
      title
    }
  }
}
`;

interface Pathway {
  id: string;
  title: string;
}


interface StarShipQueryResponse {
  pathways: {
    pathways: Pathway[];
  };
}

export const useStarships = () => {

  const { loading, error, data } =
    useQuery<StarShipQueryResponse>(STARSHIPS_QUERY);

  return {
    loading,
    error,
    pathways: data?.pathways?.pathways ?? ([] as Pathway[]),
  };
};
