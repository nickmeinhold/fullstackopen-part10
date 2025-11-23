import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";

interface AppBarTabProps {
  title: string;
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

const AppBarTab = ({ title, onPress }: AppBarTabProps) => (
  <Pressable style={styles.tab} onPress={onPress}>
    <Text style={styles.tabText}>{title}</Text>
  </Pressable>
);

export default AppBarTab;
