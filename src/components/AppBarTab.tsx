import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

interface AppBarTabProps {
  title: string;
  to: string;
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

const AppBarTab = ({ title, to }: AppBarTabProps) => (
  <Link to={to} style={styles.tab} underlayColor={theme.colors.primary}>
    <Text style={styles.tabText}>{title}</Text>
  </Link>
);

export default AppBarTab;
