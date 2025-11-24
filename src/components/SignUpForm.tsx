import React from "react";
import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

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
  error: {
    color: "#d73a4a",
    marginBottom: 8,
  },
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

interface SignUpFormValues {
  username: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: SignUpFormValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (
    values: SignUpFormValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Partial<SignUpFormValues> & { submit?: string }) => void;
    }
  ) => {
    try {
      const { username, password } = values;
      await createUser({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof Error) message = error.message;
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            autoCapitalize="none"
            testID="usernameInput"
          />
          {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
            testID="passwordInput"
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password confirmation"
            onChangeText={handleChange("passwordConfirmation")}
            onBlur={handleBlur("passwordConfirmation")}
            value={values.passwordConfirmation}
            secureTextEntry
            testID="passwordConfirmationInput"
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.error}>{errors.passwordConfirmation}</Text>
          )}

          {(errors as any).submit && <Text style={styles.error}>{(errors as any).submit}</Text>}

          <Button
            title={isSubmitting ? "Registering..." : "Sign up"}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
            testID="signUpButton"
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
