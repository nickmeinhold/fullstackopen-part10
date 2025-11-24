import { useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { GET_REPOSITORIES, ME } from "../graphql/queries";
import { RepositoryItemView } from "./RepositoryItem";

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
  ListHeaderComponent,
}: {
  repositories: any;
  ListHeaderComponent?: React.ReactElement;
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge: any) => edge.node)
    : [];

  const renderItem = ({ item }: { item: Repository }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItemView repository={item} showGithubButton={true} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 10,
      orderBy,
      orderDirection,
      searchKeyword: "",
    },
  });
  console.log("RepositoryList query data:", data);

  const { data: meData } = useQuery(ME);

  if (!meData?.me) {
    return (
      <View>
        <Text>Please sign in to view repositories</Text>
      </View>
    );
  }

  const handleOrderChange = (value: string) => {
    console.log("Selected order:", value);
    if (value === "LATEST") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
    } else if (value === "HIGHEST") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("DESC");
    } else if (value === "LOWEST") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("ASC");
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          minHeight: 80,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
          Order repositories by:
        </Text>
        <Picker
          selectedValue={(() => {
            if (orderBy === "CREATED_AT" && orderDirection === "DESC")
              return "LATEST";
            if (orderBy === "RATING_AVERAGE" && orderDirection === "DESC")
              return "HIGHEST";
            if (orderBy === "RATING_AVERAGE" && orderDirection === "ASC")
              return "LOWEST";
            return "LATEST";
          })()}
          onValueChange={handleOrderChange}
          mode="dropdown"
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
        </Picker>
      </View>
      {data?.repositories?.edges?.length ? (
        <RepositoryListContainer
          repositories={data?.repositories}
          key={`${orderBy}-${orderDirection}`}
        />
      ) : (
        <Text style={{ padding: 16, color: "red" }}>
          No repositories found for this ordering.
        </Text>
      )}
    </View>
  );
};

export default RepositoryList;
