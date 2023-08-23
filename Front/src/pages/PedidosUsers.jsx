import './PedidosUsers.css';
import React, { useEffect, useState } from 'react';
import { CeboCard, DayPicker, RealizarPedido } from '../components';
import { mostrarCatalogo } from '../services/cebos.service';
import { useMostrarCatalogoError } from '../hooks';
import { Navigate } from 'react-router-dom';

export const PedidosUsers = () => {
  const [fechaDelPedido, setFechaDelPedido] = useState(null);
  const [res, setRes] = useState([]);
  const [resError, setError] = useState(false);

  const handleDateChange = (date) => {
    setFechaDelPedido(date);
  };

  const crearListaCebo = async () => {
    setRes(await mostrarCatalogo());
  };

  useEffect(() => {
    crearListaCebo();
  }, [fechaDelPedido]);

  useEffect(() => {
    useMostrarCatalogoError(res, setError);
  }, [res]);
  // redirigimos al dashboard en caso de error en la llamada para mostrar el catalogo
  if (resError) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <div>PedidosUsers</div>
      {fechaDelPedido == null ? (
        <>
          <h1>Choose a Day</h1>
          <DayPicker selectedDate={fechaDelPedido} onDateChange={handleDateChange} />
        </>
      ) : (
        <ul>
          {res.data.map((item) => (
            <li key={item._id}>
              <CeboCard ceboData={item} />
              <RealizarPedido fechaDelPedido={fechaDelPedido} ceboId={item._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
