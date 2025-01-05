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

  const getTrip = () => {
    const tripInLocalStorage = trips.find((trip) => trip.id === id);
    if (tripInLocalStorage)
      return { trip: tripInLocalStorage, isDeleted: false };

    const tripInDeleted = deletedTrips.find((trip) => trip.id === id);
    if (tripInDeleted) return { trip: tripInDeleted, isDeleted: true };

    return null;
  };

  const tripData = getTrip();

  if (!tripData) {
    return <div className={styles.notFound}>Trip not found!</div>;
  }

  const trip = tripData.trip;
  const isDeleted = tripData.isDeleted;

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

  const handleRestore = (tripId: string) => {
    const tripToRestore = deletedTrips.find((item) => tripId === item.id);

    if (!tripToRestore) {
      console.error("Trip not found");
      return;
    }

    const updatedDeletedTrips = deletedTrips.filter(
      (item) => item.id !== tripId
    );
    setDeletedTrips(updatedDeletedTrips);
    setTrips([...trips, tripToRestore]);
    router.push("/board");
  };

  const handleTripAction = () => {
    if (!isDeleted) {
      setIsPopupOpen(true);
    } else {
      handleRestore(trip.id);
    }
  };

  return (
    <>
      <div className={styles.tripDetails}>
        <div className={styles.title}>
          <h1>{trip.destination}</h1>
          <div className={styles.buttonsContainer}>
            {!isDeleted && (
              <Button
                text="Edit Trip"
                onClick={() => router.push(`/trips/${id}/edit`)}
                className={styles.viewButton}
                color="green"
              />
            )}
            <Button
              text={isDeleted ? "Restore Trip" : "Delete Trip"}
              onClick={handleTripAction}
              className={styles.deleteButton}
              color={isDeleted ? "green" : "red"}
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
          text={isDeleted ? "Back to Deleted Trips" : "Back to Board"}
          onClick={() => router.push(isDeleted ? "/trips/deleted" : "/board")}
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
