import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GET_REPOSITORIES, ME } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

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

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
}: {
  repositories: any;
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge: any) => edge.node)
    : [];

  const renderItem = ({ item }: { item: Repository }) => (
    <RepositoryItem repository={item} />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 10,
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: "",
      after: null,
    },
  });

  const { data: meData } = useQuery(ME);

  if (!meData?.me) {
    return (
      <View>
        <Text>Please sign in to view repositories</Text>
      </View>
    );
  }

  return <RepositoryListContainer repositories={data?.repositories} />;
};

export default RepositoryList;
