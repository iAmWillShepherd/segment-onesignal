import { Formik, FormikHelpers } from "formik";
import React from "react";

interface FormValues {
  readonly message: string;
}

const initialValues: FormValues = {
  message: "",
};

const TrackAnalyticForm = () => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
);

const onSubmit = async (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => {
  const { setSubmitting } = helpers;

  const response = await fetch("/api/segment-track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  setSubmitting(false);

  const json = await response.json();
  console.log(JSON.stringify(json.analytic, null, 2));
};

export default TrackAnalyticForm;
