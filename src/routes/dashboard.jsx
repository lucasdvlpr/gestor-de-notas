import { useState, useEffect} from 'react'

import Formulario from '../components/Formulario';
import ListaNotas from '../components/ListaNotas';

export default function Dashboard(){

    const NOTASSTORAGE = JSON.parse(localStorage.getItem('notas')) ?? true;

    const [nota, setNota] = useState({});
    const [notas, setNotas] = useState(NOTASSTORAGE);
    const [notasBD, setNotasBD] = useState([]);
  
    const [loading, setLoading] = useState(false);
    
    const notasInDatabase = () =>{
      try {
        fetch('http://localhost:4000/api/notas')
          .then(response => response.json())
          .then(data => {
            setNotasBD(data);
          });
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(()=>{
      notasInDatabase();
    },[]);

    useEffect(() =>{
      const notasJSON = JSON.stringify(notasBD);
      localStorage.setItem('notas', notasJSON);
    }, [notasBD]);
  
    const crearNota = (objetoNota) => {
      setLoading(true);
      setTimeout(function (){
        fetch('http://localhost:4000/api/notas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoNota)
        })
        .then(response => response.json())
        .then(data => {
            setNotas([...notas, objetoNota]);
            setLoading(false);
            notasInDatabase(); 
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });
      }, 1000);
    }
  
    const actualizarNota = (id, notaActualizada) => {
      setLoading(true);
      setTimeout(function(){
       fetch(`http://localhost:4000/api/notas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notaActualizada)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar nota');
          }
          return response.json();
        })
        .then(data => {
          const notasActualizadas = notas.map( notaState => notaState.id === nota.id ? objetoNota : notaState)
          setNotas(notasActualizadas);
          setLoading(false);
          notasInDatabase();
        })
        .catch(error => {
          console.error('Error:', error);
        }); 
      }, 1000);
      
    }
  
    const confirmDelete = (id) => {
      const respuesta = confirm('¿Deseas eliminar esta nota?')
  
      if(respuesta){   
        setLoading(true);
        setTimeout(function(){
         fetch(`http://localhost:4000/api/notas/${id}`, {
          method: 'DELETE'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar nota');
            }
            return response.json();
          })
          .then(data => {
            const notasNoEliminadas = notas.filter(nota => nota.id !== id);
            setNotas(notasNoEliminadas);
            setLoading(false);
            notasInDatabase();
          })
          .catch(error => {
            console.error('Error:', error);
          }); 
        },1000);
        
      }
    }
  
    const goForm = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return(
        <div className="container mx-auto">
            <h2 className='text-center text-white font-bold text-lg mt-6'>
              ¡Hola,
              <span className='text-indigo-500'>{` ${localStorage.getItem('user')}`}</span>!
              </h2>

            <div className='flex justify-center flex-col mx-5 lg:flex-row lg:gap-10'>
              <Formulario 
                nota={nota}
                setNota={setNota}
                actualizarNota={actualizarNota}
                crearNota={crearNota}
              />
              {notasBD.length > 0 ? (
                     <>
                        <ListaNotas
                          notasBD={notasBD}
                          nota={nota}
                          setNota={setNota}
                          confirmDelete={confirmDelete}
                          goForm={goForm}
                          loading={loading}
                        />
                     </>            
                ) : (
                    ''
              )}
            </div>
      </div>
    )
}