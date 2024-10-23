import React from "react";
import styles from "./TripCard.module.scss";
import { Trip } from "@/types";
import { formatDate } from "@/helpers/date";
import { Badge } from "@/ui/Badge";
import { statusesColors } from "@/constants/trips";

export const TripCard = ({ trip }: {trip: Trip}) => {
  return (
    <div className={styles.tripCard}>
      <Badge text={trip.status} color={statusesColors[trip.status]} />
      <h3 className={styles.destination}>{trip.destination}</h3>
      <p className={styles.dateRange}>
        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
      </p>
    </div>
  );
};
