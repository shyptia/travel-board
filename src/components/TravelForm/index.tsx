import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./TravelForm.module.scss";
import { TextInput, Textarea, Select, Button } from "../../ui";
import { statusOptions } from "@/constants/travelForm";
import { Trip } from "@/types";
import { v4 as uuidv4 } from "uuid";

export interface TravelFormProps {
  initialData?: Trip;
  onSubmit: (values: Trip) => void;
}

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
  const formik = useFormik<Trip>({
    initialValues: {
      id: initialData?.id || uuidv4(),
      destination: initialData?.destination || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      notes: initialData?.notes || "",
      status: initialData?.status || statusOptions[0].value,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  const renderError = (field: keyof Trip) =>
    formik.touched[field] ? formik.errors[field] : "";

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
          error={renderError("destination")}
        />

        <TextInput
          name="startDate"
          type="date"
          label="Start Date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={renderError("startDate")}
        />

        <TextInput
          name="endDate"
          type="date"
          label="End Date"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={renderError("endDate")}
        />

        <Textarea
          name="notes"
          label="Notes"
          placeholder="Additional notes"
          value={formik.values.notes || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={renderError("notes")}
        />

        <Select
          name="status"
          label="Status"
          options={statusOptions}
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={renderError("status")}
        />

        <Button
          text={initialData ? "Update Trip" : "Create Trip"}
          type="submit"
          className={styles.submitButton}
          disabled={!formik.isValid}
        />
      </form>
    </div>
  );
};
