import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { GET_REPOSITORIES } from "../graphql/queries";

export interface UseRepositoriesOptions {
  orderBy?: string;
  orderDirection?: string;
  searchValue?: string;
  first?: number;
  after?: string | null;
}

export const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
  searchValue = "",
  first = 10,
  after = null,
}: UseRepositoriesOptions = {}) => {
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        first,
        orderBy,
        orderDirection,
        searchKeyword: debouncedSearchValue,
        after,
      },
    }
  );

  return {
    repositories: data?.repositories,
    loading,
    error,
    fetchMore,
    refetch,
    orderBy,
    orderDirection,
    searchValue,
    debouncedSearchValue,
  };
};
