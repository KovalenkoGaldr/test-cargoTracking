import React from "react";

import { cargoList } from "../../constants";
import { ICargo } from "../../types";

import "bootstrap/dist/css/bootstrap.min.css";

const CargoTable = () => {
  return (
    <div className="container mt-4">
      <h1>Список грузов</h1>
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
            {cargoList.map((cargo: ICargo) => (
              <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.name}</td>
                <td>{cargo.status}</td>
                <td>{cargo.origin}</td>
                <td>{cargo.destination}</td>
                <td>{cargo.departureDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CargoTable;
