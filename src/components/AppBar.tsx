import { useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.small,
  },
});

const AppBar = () => {
  const navigate = useNavigate();

  const { data, error } = useQuery(ME, {
    fetchPolicy: "network-only",
  });
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  console.log("AppBar render - data:", data, "loading:", "error:", error);

  const handleSignOut = async () => {
    navigate("/");
    console.log("Before removeAccessToken");
    await authStorage.removeAccessToken();
    console.log("Before resetStore");
    await client.resetStore();
    navigate("signin");
  };

  console.log("Rendering tab:", data?.me ? "Sign out" : "Sign in");
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" to="/" />
        {data && data.me && (
          <AppBarTab title="Create a review" to="/create-review" />
        )}
        {data && data.me ? (
          <AppBarTab title="Sign out" to="/" onPress={handleSignOut} />
        ) : (
          <AppBarTab title="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
