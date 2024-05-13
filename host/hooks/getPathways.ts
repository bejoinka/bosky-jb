import { gql, useApolloClient, useQuery } from "@apollo/client";

const PATHWAYS_QUERY = gql`
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

interface QueryResponse {
  code: string;
  success: boolean;
  pathways: {
    pathways: {
      id: string;
      title: string;
    }[];
  };
}

const useGetPathways = () => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery<QueryResponse>(PATHWAYS_QUERY);
  return {
    loading,
    error,
    pathways:
      data?.pathways?.pathways ?? ([] as QueryResponse["pathways"]["pathways"]),
  };
};

export default useGetPathways;
