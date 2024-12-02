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
            <label>Название</label>
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
            <label>Откуда</label>
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
            <label>Куда</label>
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
            <label>Дата отправления</label>
            <input
              type="date"
              className="form-control"
              value={newCargo.departureDate}
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
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCargoDrawer;
