import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  rating: {
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 8,
  },
  repoName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewText: {
    marginTop: 4,
  },
});

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading reviews.</Text>;

  const reviews = data?.me?.reviews?.edges?.map((e: any) => e.node) || [];

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text>You have not written any reviews yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.repoName}>{item.repository.fullName}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default MyReviews;
