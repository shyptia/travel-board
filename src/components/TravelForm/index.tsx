import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./TravelForm.module.scss";
import { TextInput, Textarea, Select } from "../../ui";
import { TravelData, TravelFormProps } from "./types";
import { statusOptions } from "@/constants/travelForm";

const validationSchema = Yup.object().shape({
  destination: Yup.string().required("Destination is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  notes: Yup.string().optional(),
  status: Yup.string().required("Status is required"),
});

export const TravelForm = ({ initialData, onSubmit }: TravelFormProps) => {
  const formik = useFormik<TravelData>({
    initialValues: initialData || {
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      if (!initialData) {
        resetForm();
      }
    },
  });

  return (
    <div className={styles.travelFormContainer}>
      <h2 className={styles.header}>
        {initialData ? "Edit Trip" : "Create Trip"}
      </h2>
      <form onSubmit={formik.handleSubmit} className={styles.travelForm}>
        <TextInput
          name="destination"
          label="Destination"
          placeholder="E.g., Paris"
          value={formik.values.destination}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.destination ? formik.errors.destination : ""}
        />

        <TextInput
          name="startDate"
          type="date"
          label="Start Date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.startDate ? formik.errors.startDate : ""}
        />

        <TextInput
          name="endDate"
          type="date"
          label="End Date"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.endDate ? formik.errors.endDate : ""}
        />

        <Textarea
          name="notes"
          label="Notes"
          placeholder="Additional notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes ? formik.errors.notes : ""}
        />

        <Select
          name="status"
          label="Status"
          options={statusOptions}
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status ? formik.errors.status : ""}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {initialData ? "Update Trip" : "Create Trip"}
        </button>
      </form>
    </div>
  );
};
