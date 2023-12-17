import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './routes/index'
import Login from './routes/login'
import Registro from './routes/registro'
import Dashboard from './routes/dashboard';
import Navegacion from './components/Navegacion';
import Usuario from './routes/usuario';

export default function App() {

  const AUTHSTORAGE = JSON.parse(localStorage.getItem('auth')) ?? true;

  const [estaAutenticado, setEstaAutenticado] = useState (AUTHSTORAGE);

  if(estaAutenticado){
    console.log("Sesion iniciada.");
  }

  return (
    <BrowserRouter>

      <Navegacion estaAutenticado={estaAutenticado} setEstaAutenticado={setEstaAutenticado}/>

      <Routes>

        <Route path='/' element={<Home />}/>

        <Route 
          path = '/login' 
          element = {
            estaAutenticado ? (<></>) : 
            (<Login setEstaAutenticado={setEstaAutenticado}/>
            )
          }
        />

        <Route 
          path='/registro' 
          element={
            <Registro setEstaAutenticado = {setEstaAutenticado}
            />}
        />

        <Route
          path="/dashboard"
          element={
            estaAutenticado ? (
              <>
              <Dashboard />
              </>
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/usuario"
          element={
            estaAutenticado ? (
              <>
              <Usuario/>
              </>
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  )
};

