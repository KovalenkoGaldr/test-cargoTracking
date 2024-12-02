export interface ICargo {
  id: string;
  name: string;
  status: "Ожидает отправки" | "В пути" | "Доставлен";
  origin: string;
  destination: string;
  departureDate: string;
}
