import React, { useState } from "react";
import { useRouter } from "next/router";
import { Trip } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./TripShow.module.scss";
import { statusesColors } from "@/constants/trips";
import { Button } from "@/ui";
import { Badge } from "@/ui/Badge";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Popup } from "@/ui/Popup";

export const TripShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", []);
  const [deletedTrips, setDeletedTrips] = useSessionStorage<Trip[]>(
    "deletedTrips",
    []
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const trip = trips.find((trip) => trip.id === id);

  if (!trip) {
    return <div className={styles.notFound}>Trip not found!</div>;
  }

  const handleDelete = (tripId: string) => {
    const tripToDelete = trips.find((item) => tripId === item.id);

    if (!tripToDelete) {
      console.error("Trip not found");
      setIsPopupOpen(false);
      router.push("/board");
      return;
    }

    const updatedTrips = trips.filter((item) => tripId !== item.id);
    setTrips(updatedTrips);

    setDeletedTrips([...deletedTrips, tripToDelete]);
    setIsPopupOpen(false);
    router.push("/board");
  };

  return (
    <>
      <div className={styles.tripDetails}>
        <div className={styles.title}>
          <h1>{trip.destination}</h1>
          <div className={styles.buttonsContainer}>
            <Button
              text="Edit Trip"
              onClick={() => router.push(`/trips/${id}/edit`)}
              className={styles.viewButton}
              color="green"
            />
            <Button
              text="Delete Trip"
              onClick={() => setIsPopupOpen(true)}
              className={styles.deleteButton}
              color="red"
            />
          </div>
        </div>

        <div className={styles.detail}>
          <strong>Start Date:</strong> {trip.startDate}
        </div>
        <div className={styles.detail}>
          <strong>End Date:</strong> {trip.endDate}
        </div>
        <div className={styles.detail}>
          <strong>Status:</strong>{" "}
          <Badge text={trip.status} color={statusesColors[trip.status]} />
        </div>

        {trip.notes && (
          <div className={styles.detail}>
            <strong>Notes:</strong> {trip.notes}
          </div>
        )}

        <Button
          text="Back to Board"
          onClick={() => router.push("/board")}
          className={styles.backButton}
        />
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => handleDelete(trip.id)}
        title="Delete Trip?"
        message="Deleted trips will be stored temporarily and can be restored during the current session. However, if you log out or leave the site, they will be permanently lost. You can view and manage deleted trips on the 'My Trips' page."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};
