import { useState, useEffect } from 'react';
import { generarId } from '../helpers/helpers';
import Error from './Error';
const Formulario = ({nota, setNota, actualizarNota, crearNota}) => {
    
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [cuerpo, setCuerpo] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const [error, setError] = useState('');

    const [fechaActual, setFechaActual] = useState(new Date());
    
    useEffect(() => {
    const intervalId = setInterval(() => {
        setFechaActual(new Date());
    }, 1000); // Actualizar cada segundo

    }, []);

    const formatoFecha = fechaActual.toLocaleDateString();

    const handleSubmit = (e) => {
        e.preventDefault();
        if([titulo,prioridad,cuerpo].includes('')){
            setError('No dejes campos vacíos');
        }else{
            setError(false);
            const objetoNota = {
                titulo,
                fecha: fechaActual.toLocaleDateString(),
                cuerpo,
                prioridad
            }
            // console.log(objetoNota)
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
            setPrioridad('');
        }
    }

    return (
    <div className='flex flex-col'>
        <h1 className="text-white font-bold text-xl md:text-2xl text-center p-5 pb-8">Escribí tus notas y{" "}administralas
        </h1>

        <form className="bg-indigo-800 p-5 rounded-md " onSubmit={handleSubmit}>

        <div className="mb-3">
            <label htmlFor="title" className='text-white text-md mb-2'>Título</label>
            <input name='titulo' value={titulo} onChange={(e)=> setTitulo(e.target.value)} id="title" type="text" placeholder="Escribe un titulo" className="p-2 border-2 border-gray-900 w-full mt-2 placeholder-gray-400 rounded-md" 
            />
        </div>

        <div className="mb-3">
            <label htmlFor="note" className='text-white text-md mb-2'>Nota</label>
            <textarea name='nota' value={cuerpo} onChange={(e)=> setCuerpo(e.target.value)} id="note" type="textarea" placeholder="Escribe tu nota aquí..." className="p-2 border-2 border-gray-900 w-full h-24 mt-2 placeholder-gray-400 rounded-md" 
            />
        </div>

        <div className="mb-3 flex flex-col">
            <label htmlFor="prioridad" className='text-white text-md'>Prioridad</label>
            <select
                id="prioridad"
                name="prioridad"
                value={prioridad}
                placeholder="p-2 border-2 border-gray-900 w-full mt-2 placeholder-gray-400 rounded-md" 
                onChange={(e) => setPrioridad(e.target.value)}
                className='p-2 border-2 border-gray-900 w-full mt-2 rounded-md'
                >
                <option value="" disabled hidden>
                    Selecciona una prioridad
                </option>
                <option value="Alta" className='text-red-500 font-semibold'>Alta</option>
                <option value="Normal" className='text-green-600 font-semibold'>Normal</option>
                <option value="Baja" className='text-yellow-500 font-semibold'>Baja</option>
            </select>
        </div>

        <p className='mb-2 text-indigo-300 py-3'>Vas a crear esta nota el día
            <span className='ml-1 font-semibold'>{formatoFecha}</span> 
        </p>


        {error && 
            <Error>
                {error}
                <button onClick={() => {setError('')}}>X</button>
            </Error>
        }

        <input type="submit" value={nota.id ? 'guardar cambios' : 'Crear nota'} className='w-full bg-gray-900 p-3 text-white font-bold text-lg rounded-md hover:bg-gray-800 cursor-pointer ease-in-out duration-300'/>

        </form>
    </div>
    )
}

export default Formulario;
