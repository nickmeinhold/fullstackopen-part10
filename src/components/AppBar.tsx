import Constants from "expo-constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../theme"; // updated

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.small,
  },
  tab: {
    marginRight: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
  },
  tabText: {
    color: theme.colors.white,
    fontWeight: "700",
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => {}}>
        <Text style={styles.tabText}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
