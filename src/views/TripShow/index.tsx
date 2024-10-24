import React from "react";
import { useRouter } from "next/router";
import { Trip } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./TripShow.module.scss";
import { Button } from "@/ui";

export const TripShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const [trips] = useLocalStorage<Trip[]>("trips", []);

  const trip = trips.find((trip) => trip.id === id);

  if (!trip) {
    return <div className={styles.notFound}>Trip not found!</div>;
  }

  return (
    <div className={styles.tripDetails}>
      <h1 className={styles.title}>{trip.destination}</h1>
      <div className={styles.detail}>
        <strong>Start Date:</strong> {trip.startDate}
      </div>
      <div className={styles.detail}>
        <strong>End Date:</strong> {trip.endDate}
      </div>
      {trip.notes && (
        <div className={styles.detail}>
          <strong>Notes:</strong> {trip.notes}
        </div>
      )}
      <div className={styles.detail}>
        <strong>Status:</strong> {trip.status}
      </div>
      <Button
        text="Back to Board"
        onClick={() => router.push("/board")}
        className={styles.backButton}
      />
      <Button
        text="Edit Trip"
        color="green"
        onClick={() => router.push(`/trips/${id}/edit`)}
        className={styles.editButton}
      />
    </div>
  );
};
