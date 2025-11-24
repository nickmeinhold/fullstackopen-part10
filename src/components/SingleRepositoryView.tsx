import React from "react";
import { useQuery } from "@apollo/client";
import { View, ActivityIndicator, Text } from "react-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { RepositoryItemView } from "./RepositoryItem";

const SingleRepositoryView = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error loading repository</Text>;
  if (!data?.repository) return <Text>Repository not found</Text>;

  return (
    <RepositoryItemView
      repository={data.repository}
      showGithubButton={true}
      githubUrl={data.repository.url}
    />
  );
};

export default SingleRepositoryView;
