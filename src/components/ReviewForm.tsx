import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import { CREATE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    margin: 16,
  },
  field: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: "#d73a4a",
    marginBottom: 8,
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner's username is required"),
  repositoryName: Yup.string().required("Repository's name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  text: Yup.string(),
});

interface ReviewFormValues {
  ownerName: string;
  repositoryName: string;
  rating: string;
  text: string;
}

const initialValues: ReviewFormValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (
    values: ReviewFormValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (
        errors: Partial<ReviewFormValues> & { submit?: string }
      ) => void;
    }
  ) => {
    try {
      const { ownerName, repositoryName, rating, text } = values;
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
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
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.field}
            placeholder="Repository owner's username"
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
            value={values.ownerName}
            autoCapitalize="none"
            testID="ownerNameInput"
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={styles.field}
            placeholder="Repository's name"
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
            value={values.repositoryName}
            autoCapitalize="none"
            testID="repositoryNameInput"
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={styles.field}
            placeholder="Rating (0-100)"
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
            keyboardType="numeric"
            testID="ratingInput"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.error}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.field, { height: 80 }]}
            placeholder="Review"
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
            multiline
            testID="reviewInput"
          />
          {touched.text && errors.text && (
            <Text style={styles.error}>{errors.text}</Text>
          )}

          {(errors as any).submit && (
            <Text style={styles.error}>{(errors as any).submit}</Text>
          )}

          <Button
            title={isSubmitting ? "Submitting..." : "Create Review"}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
            testID="submitButton"
          />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
