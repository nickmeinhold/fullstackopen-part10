import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
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
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

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

  const handleViewRepo = (repoId: string) => {
    navigate(`/repository/${repoId}`);
  };

  const handleDeleteReview = (reviewId: string) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteReview({ variables: { id: reviewId } });
            refetch();
          },
        },
      ]
    );
  };

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
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  title="View repository"
                  onPress={() => handleViewRepo(item.repository.id)}
                  color="#007AFF"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Delete review"
                  onPress={() => handleDeleteReview(item.id)}
                  color="#FF3B30"
                />
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default MyReviews;
