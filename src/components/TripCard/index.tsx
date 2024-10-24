import React from "react";
import styles from "./TripCard.module.scss";
import { Trip } from "@/types";
import { formatDate } from "@/helpers/date";
import { Badge } from "@/ui/Badge";
import { statusesColors } from "@/constants/trips";
import { useDrag } from "react-dnd";

export const TripCard = ({ trip }: { trip: Trip }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TRIP",
    item: { id: trip.id, status: trip.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      // @ts-expect-error 2322
      ref={drag}
      className={styles.tripCard}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Badge text={trip.status} color={statusesColors[trip.status]} />
      <h3 className={styles.destination}>{trip.destination}</h3>
      <p className={styles.dateRange}>
        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
      </p>
    </div>
  );
};
