import React from "react";
import styles from "./TripCard.module.scss";
import { Trip } from "@/types";
import { formatDate } from "@/helpers/date";
import { Badge } from "@/ui/Badge";
import { statusesColors } from "@/constants/trips";
import { useDrag } from "react-dnd";
import { useRouter } from "next/router";
import { Button } from "@/ui";
import EditIcon from "../../../public/icons/edit.svg";
import ShowIcon from "../../../public/icons/show.svg";
import { Icon } from "@/ui/Icon";

interface TripCardProps {
  trip: Trip;
  isDeletedTrip?: boolean;
}

export const TripCard = ({ trip, isDeletedTrip = false }: TripCardProps) => {
  const router = useRouter();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TRIP",
    item: { id: trip.id, status: trip.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleEdit = () => {
    router.push(`/trips/${trip.id}/edit`);
  };

  const handleShow = () => {
    router.push(`/trips/${trip.id}`);
  };

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
      {trip.notes && (
        <p className={styles.notes} title={trip.notes}>
          {trip.notes}
        </p>
      )}
      <div className={styles.buttonContainer}>
        <Button
          icon={<Icon icon={ShowIcon} alt="Show" width={17} height={17} />}
          color="green"
          size="sm"
          onClick={handleShow}
        />
        {!isDeletedTrip && (
          <Button
            icon={<Icon icon={EditIcon} alt="Edit" width={17} height={17} />}
            size="sm"
            onClick={handleEdit}
          />
        )}
      </div>
    </div>
  );
};
