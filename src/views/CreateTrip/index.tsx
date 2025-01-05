import React from "react";
import styles from "./CreateTrip.module.scss";
import { TravelForm } from "@/components/TravelForm";
import { Trip } from "@/types";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const CreateTrip = () => {
  const router = useRouter();
  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", []);

  const handleSubmit = (newTrip: Trip) => {
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    router.push("/trips");
  };

  return (
    <div className={styles.createTripPage}>
      <h1 className={styles.header}>Create a New Trip</h1>
      <div className={styles.travelFormWrapper}>
        <TravelForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
