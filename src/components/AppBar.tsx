import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
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
  // tab styles moved to AppBarTab
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
