import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { Repository } from "./RepositoryList";

const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.tiny,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.small,
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.languageBackground,
    color: theme.colors.white,
    paddingVertical: theme.spacing.tiny,
    paddingHorizontal: theme.spacing.small,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: theme.spacing.small,
  },
});

const RepositoryInfo = ({ repository }: { repository: Repository }) => (
  <View style={styles.info}>
    <Text style={styles.fullName}>{repository.fullName}</Text>
    <Text style={styles.description}>{repository.description}</Text>
    <Text style={styles.language}>{repository.language}</Text>
  </View>
);

export default RepositoryInfo;
