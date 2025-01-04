import React from "react";
import { Button } from "../../ui/Button";
import styles from "./Trips.module.scss";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip } from "@/types";

export const TripsPage = () => {
  const router = useRouter();
  const [trips] = useLocalStorage<Trip[]>("trips", []);

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
        {trips.length > 0 ? (
          <div>
            <p>
              You have {trips.length} trip(s) stored. Check them out on the
              board!
            </p>
            <Button
              text="View Trips"
              onClick={() => router.push("/board")}
              className={styles.viewTripsButton}
            />
          </div>
        ) : (
          <p>No trips yet. Start by creating a new trip.</p>
        )}
      </div>
    </div>
  );
};
