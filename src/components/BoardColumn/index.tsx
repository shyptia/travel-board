import React from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "./BoardColumn.module.scss";
import { TripCard } from "@/components/TripCard";
import { Trip, TripStatus } from "@/types";

interface BoardColumnProps {
  status: TripStatus;
  trips: Trip[];
  onDropTrip: (tripId: string, newStatus: TripStatus) => void;
}

export const BoardColumn = ({
  status,
  trips,
  onDropTrip,
}: BoardColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TRIP",
    drop: (item: Trip) => {
      onDropTrip(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      // @ts-expect-error 2322
      ref={drop}
      className={classNames(styles.boardColumn, { [styles.isOver]: isOver })}
    >
      <h2 className={styles.columnHeader}>{status}</h2>
      <div className={styles.tripList}>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};
