import React from "react";
import { Button } from "../../ui/Button";
import styles from "./Trips.module.scss";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip } from "@/types";
import Image from "next/image";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export const TripsPage = () => {
  const router = useRouter();
  const [trips] = useLocalStorage<Trip[]>("trips", []);
  const [deletedTrips] = useSessionStorage<Trip[]>("deletedTrips", []);

  return (
    <div className={styles.tripsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>My Trips</h1>
        <div className={styles.buttonsWrapper}>
          {!!deletedTrips.length && (
            <Button
              text="View Deleted Trips"
              onClick={() => router.push("/trips/deleted")}
              color="red"
            />
          )}
          <Button
            text="View My Trips"
            onClick={() => router.push("/board")}
            className={styles.viewTripsButton}
          />
          <Button
            text="Create New Trip"
            onClick={() => router.push("/trips/new")}
            className={styles.createTripButton}
            color="green"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.travelInspiration}>
          <Image
            src="/images/travel.png"
            alt="Travel Inspiration"
            width={300}
            height={300}
            className={styles.inspirationImage}
          />
          <p className={styles.inspirationText}>
            Traveling opens up new worlds! Whether it&apos;s an adventure to a
            distant land or a road trip to discover hidden gems, every journey
            has something unique to offer. Every trip holds stories that shape
            our perspectives and leave us with unforgettable memories.
          </p>
          <p className={styles.inspirationText}>
            Imagine exploring bustling cities, discovering quiet villages, or
            relaxing by the beach. The beauty of travel is that it offers
            something for everyone. Whether you&apos;re seeking adventure, culture,
            relaxation, or nature, the world is full of wonders waiting to be
            discovered.
          </p>
          <p className={styles.inspirationText}>
            So, pack your bags, grab your passport, and let the journey begin!
            Start planning your next adventure today.
          </p>
        </div>

        <div className={styles.tripInfo}>
          {trips.length > 0 ? (
            <p className={styles.tripCount}>
              You have {trips.length} trip(s) stored. Check them out on the
              board and plan your next adventure!
            </p>
          ) : (
            <p className={styles.tripCount}>
              No trips yet. Start by creating a new trip and make memories!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
