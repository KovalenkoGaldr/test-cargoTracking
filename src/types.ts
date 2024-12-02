export interface ICargo {
  id: string;
  name: string;
  status: TStatuses;
  origin: string;
  destination: string;
  departureDate: string;
}

export type TStatuses = "Ожидает отправки" | "В пути" | "Доставлен";
