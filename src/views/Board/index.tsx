import React from "react";
import styles from "./Board.module.scss";
import { BoardColumn } from "@/components/BoardColumn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip, TripStatus } from "@/types";
import { statusOptions } from "@/constants/trips";

export const Board = () => {
  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", []);

  const handleDropTrip = (tripId: string, newStatus: TripStatus) => {
    setTrips((prevTrips) => {
      const updatedTrips = prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      );
      return updatedTrips;
    });
  };

  const getTripsByStatus = (status: string) => {
    return trips.filter((trip) => trip.status === status);
  };

  return (
    <div className={styles.board}>
      {statusOptions.map((status) => (
        <BoardColumn
          key={status.value}
          status={status.value}
          trips={getTripsByStatus(status.value)}
          onDropTrip={handleDropTrip}
        />
      ))}
    </div>
  );
};
