import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './routes/Index'
import Login from './routes/Login'
import Registro from './routes/Registro'
import Dashboard from './routes/Dashboard';
import Navegacion from './components/Navegacion';
import Usuario from './routes/Usuario';

export default function App() {

  const AUTHSTORAGE = JSON.parse(localStorage.getItem('auth')) ?? true;

  const [estaAutenticado, setEstaAutenticado] = useState (AUTHSTORAGE);

  if(estaAutenticado){
    console.log("Sesion iniciada.");
  }

  return (
    <Router>

      <div className='flex flex-col lg:flex-row'>
        <Navegacion estaAutenticado={estaAutenticado} setEstaAutenticado={setEstaAutenticado}/>
        
        <div className='flex-1'>
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
        </div>
      </div>

    </Router>
  )
};

