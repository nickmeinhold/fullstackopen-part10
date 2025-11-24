import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { RepositoryItemView } from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rating: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  reviewText: {
    marginTop: 4,
    fontSize: 15,
    color: "#333",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd.MM.yyyy");
};

const ReviewItem = ({ review }: { review: any }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewHeader}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
    </View>
    <Text style={styles.reviewText}>{review.text}</Text>
  </View>
);

const REVIEWS_PAGE_SIZE = 5;

const SingleRepositoryView = ({ id }: { id: string }) => {
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [pageInfo, setPageInfo] = React.useState<any>(null);
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: REVIEWS_PAGE_SIZE, after: undefined },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const edges = data?.repository?.reviews?.edges || [];
      setReviews(edges.map((edge: any) => edge.node));
      setPageInfo(data?.repository?.reviews?.pageInfo);
    },
  });

  const handleFetchMore = () => {
    if (!pageInfo?.hasNextPage || loading) return;
    fetchMore({
      variables: {
        id,
        first: REVIEWS_PAGE_SIZE,
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.repository?.reviews?.edges || [];
        const newPageInfo = fetchMoreResult?.repository?.reviews?.pageInfo;
        setReviews((prev) => [
          ...prev,
          ...newEdges.map((edge: any) => edge.node),
        ]);
        setPageInfo(newPageInfo);
        return fetchMoreResult;
      },
    });
  };

  if (loading && reviews.length === 0) return <ActivityIndicator />;
  if (error) return <Text>Error loading repository</Text>;
  if (!data?.repository) return <Text>Repository not found</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItemView
          repository={data.repository}
          showGithubButton={true}
          githubUrl={data.repository.url}
        />
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
