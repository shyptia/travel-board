import React from "react";
import styles from "./Board.module.scss";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip } from "@/types";
import { statusOptions } from "@/constants/trips";
import { TripCard } from "@/components/TripCard";

export const Board = () => {
  const [trips] = useLocalStorage<Trip[]>("trips", []);

  const groupedTrips = statusOptions.reduce((acc, { value }) => {
    acc[value] = trips.filter((trip) => trip.status === value);
    return acc;
  }, {} as Record<string, Trip[]>);

  return (
    <div className={styles.board}>
      {statusOptions.map(({ value, label }) => (
        <div key={value} className={styles.column}>
          <h2>{label}</h2>
          {groupedTrips[value]?.length ? (
            groupedTrips[value].map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))
          ) : (
            <p>No {label.toLowerCase()} trips.</p>
          )}
        </div>
      ))}
    </div>
  );
};
