import React from "react";
import { Button } from "../../ui/Button";
import styles from "./Trips.module.scss";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trip } from "@/types";
import Image from "next/image";

export const TripsPage = () => {
  const router = useRouter();
  const [trips] = useLocalStorage<Trip[]>("trips", []);

  const handleNewTripClick = () => {
    router.push("/trips/new");
  };

  const handleViewTripsClick = () => {
    router.push("/board");
  };

  return (
    <div className={styles.tripsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>My Trips</h1>
        <div className={styles.buttonsWrapper}>
          <Button
            text="Create New Trip"
            onClick={handleNewTripClick}
            className={styles.createTripButton}
            color="green"
          />
          <Button
            text="View My Trips"
            onClick={handleViewTripsClick}
            className={styles.viewTripsButton}
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
            Traveling opens up new worlds! Whether it's an adventure to a
            distant land or a road trip to discover hidden gems, every journey
            has something unique to offer. Every trip holds stories that shape
            our perspectives and leave us with unforgettable memories.
          </p>
          <p className={styles.inspirationText}>
            Imagine exploring bustling cities, discovering quiet villages, or
            relaxing by the beach. The beauty of travel is that it offers
            something for everyone. Whether you're seeking adventure, culture,
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
