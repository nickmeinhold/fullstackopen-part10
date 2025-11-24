import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

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

export const SignInForm = ({
  onSubmit,
}: {
  onSubmit: (values: { username: string; password: string }) => void;
}) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
          onSubmitEditing={() => handleSubmit()}
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const { username, password } = values;
    setErrorMessage(null);
    try {
      const accessToken = await signIn({ username, password });
      if (accessToken) {
        navigate("/");
      } else {
        setErrorMessage("Sign in failed. Please check your credentials.");
      }
    } catch (e) {
      setErrorMessage("Sign in failed. Please try again.");
      console.log(e);
    }
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;
