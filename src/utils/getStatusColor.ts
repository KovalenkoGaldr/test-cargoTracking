import { TStatuses } from "../types";

export const getStatusColor = (status: TStatuses) => {
  switch (status) {
    case "Ожидает отправки":
      return "text-warning";
    case "В пути":
      return "text-primary";
    case "Доставлен":
      return "text-success";
    default:
      return "";
  }
};
