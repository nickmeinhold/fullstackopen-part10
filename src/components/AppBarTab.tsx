import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

interface AppBarTabProps {
  title: string;
  to?: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
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

const AppBarTab = ({ title, to, onPress }: AppBarTabProps) => {
  if (onPress) {
    return (
      <Pressable
        style={styles.tab}
        onPress={onPress}
        android_ripple={{ color: theme.colors.primary }}
      >
        <Text style={styles.tabText}>{title}</Text>
      </Pressable>
    );
  }
  return (
    <Link
      to={typeof to === "string" ? to : ""}
      style={styles.tab}
      underlayColor={theme.colors.primary}
    >
      <Text style={styles.tabText}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
