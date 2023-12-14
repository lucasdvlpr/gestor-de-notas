import { useState, useEffect } from 'react';
import { generarId } from '../helpers/helpers';
import Error from './Error';
const Formulario = ({nota, setNota, actualizarNota, crearNota}) => {
    
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [cuerpo, setCuerpo] = useState('');

    const [error, setError] = useState('');

    useEffect(()=>{
        if( Object.keys(nota).length > 0){
            setTitulo(nota.titulo)
            setFecha(nota.fecha)
            setCuerpo(nota.cuerpo)
        }
    }, [nota]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if([titulo,fecha,cuerpo].includes('')){
            setError('No dejes campos vacíos');
        }else{
            setError(false);
            const objetoNota = {
                titulo,
                fecha,
                cuerpo,
            }

            if(nota.id){
                objetoNota.id = nota.id
                actualizarNota(objetoNota.id, objetoNota);
                setNota({});
            }else{
                objetoNota.id = generarId()
                crearNota(objetoNota);
            }
            setTitulo('');
            setFecha('');
            setCuerpo('');
        }
    }

    return (
    <div className='lg:w-1/2 mb-5 lg:mb-0'>
        <h1 className="text-white font-bold text-xl md:text-2xl text-center my-6">Escribí tus notas y{" "}administralas
        </h1>

        <form onSubmit={handleSubmit} className=''>

        <div className="mb-5">
            <label htmlFor="title" className='text-white text-md mb-2'>Título</label>
            <input name='titulo' value={titulo} onChange={(e)=> setTitulo(e.target.value)} id="title" type="text" placeholder="Escribe un titulo" className="p-2 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md" 
            />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className='text-white text-md mb-2'>Fecha</label>
          <input name='fecha' value={fecha} onChange={(e)=> setFecha(e.target.value)} id="date" type="date" className="p-2 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"/>
        </div>

        <div className="mb-5">
            <label htmlFor="note" className='text-white text-md mb-2'>Nota</label>
            <textarea name='nota' value={cuerpo} onChange={(e)=> setCuerpo(e.target.value)} id="note" type="textarea" placeholder="Escribe tu nota aquí..." className="p-2 border-2 border-indigo-600 w-full h-36 mt-2 placeholder-gray-400 rounded-md" 
            />
        </div>

        {error && 
            <Error>
                {error}
                <button onClick={() => {setError('')}}>X</button>
            </Error>
        }

        <input type="submit" value={nota.id ? 'guardar cambios' : 'crear nota'} className='w-full bg-indigo-800 p-3 text-white uppercase font-bold text-lg rounded-md hover:bg-indigo-500 cursor-pointer ease-in-out duration-300'/>

        </form>
    </div>
    )
}

export default Formulario;
