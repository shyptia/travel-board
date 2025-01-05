import React from "react";
import { Trip } from "@/types";
import styles from "./DeletedTrips.module.scss";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { TripCard } from "@/components/TripCard";

export const DeletedTrips = () => {
  const [deletedTrips] = useSessionStorage<Trip[]>("deletedTrips", []);

  if (!deletedTrips.length) {
    return <div className={styles.noTrips}>No deleted trips available.</div>;
  }

  return (
    <div className={styles.deletedTrips}>
      <h1 className={styles.title}>Deleted Trips</h1>
      <div className={styles.cardContainer}>
        {deletedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} isDeletedTrip />
        ))}
      </div>
    </div>
  );
};
