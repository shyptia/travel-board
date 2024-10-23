import React from "react";
import styles from "./CreateTrip.module.scss";
import { TravelForm } from "@/components/TravelForm";
import { Trip } from "@/types";
import { useRouter } from "next/router";

export const CreateTrip = () => {
  const router = useRouter();
  const handleSubmit = (newTrip: Trip) => {
    const trips = localStorage.getItem("trips");
    let parsedTrips = [];

    if (trips) {
      parsedTrips = JSON.parse(trips);
    }

    const updatedTrips = [...parsedTrips, newTrip];
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    router.push('/trips')
  };

  return (
    <div className={styles.createTripPage}>
      <h1 className={styles.header}>Create a New Trip</h1>
      <TravelForm onSubmit={handleSubmit} />
    </div>
  );
};
