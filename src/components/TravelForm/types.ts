export interface TravelData {
  destination: string;
  startDate: string;
  endDate: string;
  notes: string;
  status: string;
}

export interface TravelFormProps {
  initialData?: TravelData;
  onSubmit: (values: TravelData) => void;
}
