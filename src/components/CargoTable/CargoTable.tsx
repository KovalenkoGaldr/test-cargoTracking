import React, { useEffect, useState } from "react";

import Modal from "../Modal/Modal";
import AddCargoDrawer from "../AddCargoDrawer/AddCargoDrawer";
import { ICargo, TStatuses } from "../../types";
import { getStatusColor } from "../../utils/getStatusColor";

import "bootstrap/dist/css/bootstrap.min.css";

const CargoTable = () => {
  const [cargoList, setCargoList] = useState<ICargo[]>(() =>
    JSON.parse(localStorage.getItem("cargoList") || "[]")
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("cargoList", JSON.stringify(cargoList));
  }, [cargoList]);

  const handleAddCargo = (newCargo: ICargo) => {
    setCargoList([...cargoList, newCargo]);
    setShowForm(false);
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Список грузов</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Добавить груз
        </button>
      </div>

      {showForm && (
        <AddCargoDrawer
          onAddCargo={handleAddCargo}
          onCancel={() => setShowForm(false)}
        />
      )}

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
                      className={`form-select ${getStatusColor(cargo.status)}`}
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
