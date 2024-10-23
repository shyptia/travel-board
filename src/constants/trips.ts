import { TripStatus } from "@/types";

export const statusOptions: {value: TripStatus, label: string}[] = [
  { value: "idea", label: "Idea" },
  { value: "planned", label: "Planned" },
  { value: "booked", label: "Booked" },
  { value: "visited", label: "Visited" },
];

export const statusesColors = {
  idea: "yellow",
  planned: "blue",
  booked: "green",
  visited: "gray",
};
