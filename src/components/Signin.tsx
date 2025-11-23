import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

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
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username && { borderColor: "red" },
            ]}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            autoCapitalize="none"
          />
          {touched.username && errors.username && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.username}
            </Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password && { borderColor: "red" },
            ]}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.password}
            </Text>
          )}
          <View style={styles.button}>
            <Button title="Sign in" onPress={handleSubmit as any} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
