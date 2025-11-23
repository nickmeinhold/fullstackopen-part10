import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { Repository } from "./RepositoryList";

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.small,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
});

const RepositoryStats = ({ repository }: { repository: Repository }) => (
  <View style={styles.stats}>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{formatCount(repository.stargazersCount)}</Text>
      <Text style={styles.statLabel}>Stars</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{formatCount(repository.forksCount)}</Text>
      <Text style={styles.statLabel}>Forks</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{formatCount(repository.reviewCount)}</Text>
      <Text style={styles.statLabel}>Reviews</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{formatCount(repository.ratingAverage)}</Text>
      <Text style={styles.statLabel}>Rating</Text>
    </View>
  </View>
);

export default RepositoryStats;
