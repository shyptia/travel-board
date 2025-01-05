import React from "react";
import { Trip } from "@/types";
import styles from "./DeletedTrips.module.scss";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { TripCard } from "@/components/TripCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/ui";
import { useRouter } from "next/router";

export const DeletedTrips = () => {
  const router = useRouter();
  const [deletedTrips, setDeletedTrips] = useSessionStorage<Trip[]>(
    "deletedTrips",
    []
  );
  const [, setTrips] = useLocalStorage<Trip[]>("trips", []);

  const restoreAllTrips = () => {
    if (deletedTrips.length > 0) {
      setTrips((prevTrips) => [...prevTrips, ...deletedTrips]);
      setDeletedTrips([]);
      router.push("/board");
    }
  };

  if (!deletedTrips.length) {
    return <div className={styles.noTrips}>No deleted trips available.</div>;
  }

  return (
    <div className={styles.deletedTrips}>
      <div className={styles.header}>
        <h1 className={styles.title}>Deleted Trips</h1>
        <Button
          text="Restore All Trips"
          className={styles.restoreButton}
          onClick={restoreAllTrips}
          color="green"
        />
      </div>
      <div className={styles.cardContainer}>
        {deletedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} isDeletedTrip />
        ))}
      </div>
    </div>
  );
};
