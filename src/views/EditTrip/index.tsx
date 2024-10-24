import React from "react";
import styles from "./EditTrip.module.scss";
import { TravelForm } from "@/components/TravelForm";
import { Trip } from "@/types";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const EditTrip = () => {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", []);

  const foundedTrip = trips.find((trip) => trip.id === id);

  const handleSubmit = (updatedTrip: Trip) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    );
    setTrips(updatedTrips);
    router.push("/trips");
  };

  return (
    <div className={styles.editTripPage}>
      <h1 className={styles.header}>Edit Trip</h1>
      <TravelForm onSubmit={handleSubmit} initialData={foundedTrip} />
    </div>
  );
};
