import { StyleSheet, View } from "react-native";
import theme from "../theme";
import RepositoryAvatar from "./RepositoryAvatar";
import RepositoryInfo from "./RepositoryInfo";
import { Repository } from "./RepositoryList";
import RepositoryStats from "./RepositoryStats";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    borderRadius: 6,
    marginBottom: theme.spacing.small,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

const RepositoryItem = ({ repository }: { repository: Repository }) => (
  <View style={styles.container} testID={`repositoryItem-${repository.id}`}>
    <RepositoryAvatar uri={repository.ownerAvatarUrl} />
    <View style={{ flex: 1 }}>
      <RepositoryInfo repository={repository} />
      <RepositoryStats repository={repository} />
    </View>
  </View>
);

export default RepositoryItem;
