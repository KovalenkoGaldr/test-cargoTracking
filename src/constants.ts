import { ICargo } from "./types";

export const initCargoList: ICargo[] = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-12-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];
