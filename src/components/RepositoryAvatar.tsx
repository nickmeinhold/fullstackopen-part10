import { Image, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: theme.spacing.medium,
  },
});

const RepositoryAvatar = ({ uri }: { uri: string }) => (
  <Image source={{ uri }} style={styles.avatar} />
);

export default RepositoryAvatar;
