import React, { useState } from "react";

import { cities } from "../../constants";
import { ICargo } from "../../types";

interface IAddCargoDrawerProps {
  onAddCargo: (newCargo: ICargo) => void;
  onCancel: () => void;
}

const AddCargoDrawer = (props: IAddCargoDrawerProps) => {
  const { onAddCargo, onCancel } = props;
  const [newCargo, setNewCargo] = useState<ICargo>({
    id: "",
    name: "",
    status: "Ожидает отправки",
    origin: "",
    destination: "",
    departureDate: "",
  });

  const minDate = "2020-01-01";
  const maxDate = "2030-01-01";
  const disabledSave =
    !newCargo.name ||
    !newCargo.origin ||
    !newCargo.destination ||
    !newCargo.departureDate ||
    newCargo.departureDate < minDate ||
    newCargo.departureDate > maxDate;

  const handleAddCargo = () => {
    const newCargoWithId = { ...newCargo, id: "id" };
    onAddCargo(newCargoWithId);
  };

  return (
    <>
      <div
        className="side-menu open p-4"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.5)",
          transition: "right 0.3s ease",
          zIndex: 1000,
        }}
      >
        <div className="modal-header mb-3">
          <h5 className="modal-title">Создать новый груз</h5>
          <button type="button" className="btn-close" onClick={onCancel} />
        </div>

        <div className="modal-body">
          <div className="form-group mb-3">
            <label className="mb-2">Название</label>
            <input
              type="text"
              className="form-control"
              value={newCargo.name}
              onChange={(e) =>
                setNewCargo({ ...newCargo, name: e.target.value })
              }
            />
          </div>

          <div className="form-group mb-3">
            <label className="mb-2">Откуда</label>
            <select
              className="form-select"
              value={newCargo.origin}
              onChange={(e) =>
                setNewCargo({ ...newCargo, origin: e.target.value })
              }
            >
              <option value="">Выберите город</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="mb-2">Куда</label>
            <select
              className="form-select"
              value={newCargo.destination}
              onChange={(e) =>
                setNewCargo({ ...newCargo, destination: e.target.value })
              }
            >
              <option value="">Выберите город</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="mb-2 text-left">Дата отправления</label>
            <input
              type="date"
              className="form-control"
              value={newCargo.departureDate}
              min="2023-01-01"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setNewCargo({ ...newCargo, departureDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary me-3"
            onClick={onCancel}
          >
            Отменить
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddCargo}
            disabled={disabledSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCargoDrawer;
