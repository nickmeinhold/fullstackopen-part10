import { Formik } from "formik";
import { Button, StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 8,
  },
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
          />
          <View style={styles.button}>
            <Button title="Sign in" onPress={handleSubmit as any} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
