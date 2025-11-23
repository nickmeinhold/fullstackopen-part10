import { useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
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
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" to="/" />
        {data && data.me ? (
          <AppBarTab title="Sign out" to="/" />
        ) : (
          (handleSignOut(), (<AppBarTab title="Sign in" to="/signin" />))
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
