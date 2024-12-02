import React, { useEffect, useState } from "react";

import { initCargoList } from "../../constants";
import { ICargo, TStatuses } from "../../types";
import Modal from "../Modal/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

const CargoTable = () => {
  const [cargoList, setCargoList] = useState<ICargo[]>(initCargoList);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      console.log("Ошибка обновилась:", errorMessage);
    }
  }, [errorMessage]);

  const getStatusClass = (status: TStatuses) => {
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

  const handleStatusChange = (id: string, newStatus: TStatuses) => {
    const updatedCargoList = cargoList.map((cargo) => {
      if (cargo.id === id) {
        if (newStatus === "Доставлен") {
          const departureDate = new Date(cargo.departureDate);
          const now = new Date();

          if (departureDate > now) {
            setErrorMessage(
              `Статус груза "${cargo.name}" на "Доставлен" не был изменен, так как дата отправления ${cargo.departureDate} еще не наступила`
            );

            return cargo;
          }
        }

        return { ...cargo, status: newStatus };
      }

      return cargo;
    });

    setCargoList(updatedCargoList);
  };

  const closeModal = () => {
    setErrorMessage(null);
  };

  console.log(errorMessage);
  return (
    <div className="container mt-4">
      <h1>Список грузов</h1>

      {errorMessage && <Modal text={errorMessage} closeModal={closeModal} />}

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Статус</th>
              <th scope="col">Откуда</th>
              <th scope="col">Куда</th>
              <th scope="col">Дата отправления</th>
            </tr>
          </thead>
          <tbody>
            {cargoList.length ? (
              cargoList.map((cargo: ICargo) => (
                <tr key={cargo.id}>
                  <td>{cargo.id}</td>
                  <td>{cargo.name}</td>
                  <td>
                    <select
                      className={`form-select ${getStatusClass(cargo.status)}`}
                      value={cargo.status}
                      onChange={(e) =>
                        handleStatusChange(
                          cargo.id,
                          e.target.value as TStatuses
                        )
                      }
                    >
                      <option value="Ожидает отправки">Ожидает отправки</option>
                      <option value="В пути">В пути</option>
                      <option value="Доставлен">Доставлен</option>
                    </select>
                  </td>
                  <td>{cargo.origin}</td>
                  <td>{cargo.destination}</td>
                  <td>{cargo.departureDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Данных нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CargoTable;
