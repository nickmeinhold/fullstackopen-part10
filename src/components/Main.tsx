import { StyleSheet, View } from "react-native";
import { Route, Routes, useParams } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import ReviewForm from "./ReviewForm";
import SignIn from "./Signin";
import SingleRepositoryView from "./SingleRepositoryView";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const SingleRepoRoute = () => {
  const { id } = useParams();
  return <SingleRepositoryView id={id ?? ""} />;
};

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepoRoute />} />
        <Route path="/create-review" element={<ReviewForm />} />
      </Routes>
    </View>
  );
};

export default Main;
