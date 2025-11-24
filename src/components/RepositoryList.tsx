import { useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
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

interface RepositoryListContainerProps {
  repositories: any;
  searchValue: string;
  onSearchChange: (text: string) => void;
  orderBy: string;
  orderDirection: string;
  handleOrderChange: (value: string) => void;
  navigate: (path: string) => void;
}

export class RepositoryListContainer extends React.Component<RepositoryListContainerProps> {
  renderHeader = () => {
    const {
      searchValue,
      onSearchChange,
      orderBy,
      orderDirection,
      handleOrderChange,
    } = this.props;
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
        <View style={{ padding: 10, backgroundColor: "#fff" }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              padding: 8,
              minWidth: 220,
            }}
            placeholder="Filter repositories by keyword..."
            value={searchValue}
            onChangeText={onSearchChange}
            testID="searchInput"
          />
        </View>
      </View>
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge: any) => edge.node)
      : [];

    const renderItem = ({ item }: { item: any }) => (
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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const navigate = useNavigate();

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 10,
      orderBy,
      orderDirection,
      searchKeyword: debouncedSearchValue ? debouncedSearchValue : "",
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

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <RepositoryListContainer
      repositories={data?.repositories}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      orderBy={orderBy}
      orderDirection={orderDirection}
      handleOrderChange={handleOrderChange}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
