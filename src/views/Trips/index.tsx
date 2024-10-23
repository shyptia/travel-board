import React from "react";
import { Button } from "../../ui/Button";
import styles from "./Trips.module.scss";
import { useRouter } from "next/router";

export const TripsPage = () => {
  const router = useRouter();

  const handleNewTripClick = () => {
    router.push("/trips/new");
  };

  return (
    <div className={styles.tripsPage}>
      <div className={styles.header}>
        <h1>My Trips</h1>
        <Button
          text="Create New Trip"
          onClick={handleNewTripClick}
          className={styles.createTripButton}
        />
      </div>
      <div className={styles.content}>
        <p>No trips yet. Start by creating a new trip.</p>
      </div>
    </div>
  );
};
