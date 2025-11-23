import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";

import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface RepositoryListProps {
  repositories?: Repository[];
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({
  repositories: propRepositories,
}: RepositoryListProps) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 10,
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: "",
      after: null,
    },
  });

  const dataEdges = data?.repositories?.edges || [];
  const dataRepositories = dataEdges.map((edge: any) => edge.node);

  const renderItem = ({ item }: { item: Repository }) => (
    <RepositoryItem repository={item} />
  );

  return (
    <FlatList
      data={dataRepositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
