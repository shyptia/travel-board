import React from "react";
import styles from "./Board.module.scss";
import { BoardColumn } from "@/components/BoardColumn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip, TripStatus } from "@/types";
import { statusOptions } from "@/constants/trips";
import Image from "next/image";
import Link from "next/link";

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
      {trips.length === 0 ? (
        <div className={styles.emptyState}>
          <Image
            src="/images/travel.png"
            alt="No trips"
            width={200}
            height={200}
          />
          <p className={styles.emptyMessage}>
            There are no trips yet.{" "}
            <Link href="/trips/new" className={styles.link}>
              Create a new trip.
            </Link>
          </p>
        </div>
      ) : (
        statusOptions.map((status) => (
          <BoardColumn
            key={status.value}
            status={status.value}
            trips={getTripsByStatus(status.value)}
            onDropTrip={handleDropTrip}
          />
        ))
      )}
    </div>
  );
};
