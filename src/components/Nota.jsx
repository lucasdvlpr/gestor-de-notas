import { useEffect, useState } from "react"

const Nota = ({nota, setNota, confirmDelete, goForm}) => {

    const {titulo, fecha, cuerpo, prioridad, id} = nota

    const editarNota = () => {
        goForm()
        setNota(nota)
    }

    return (
        <>
            <div className='flex flex-col bg-indigo-600 rounded-md p-5 mb-6'>

                <div className="flex justify-between">
                    <h1 className='text-white text-2xl mb-5 w-full font-semibold  underline'>{titulo}</h1>
                    
                    <p>Prioridad: {prioridad}</p>
                </div>

                <p className='text-white mb-5  w-full text-left'>{cuerpo}</p>

                <p className='text-white w-full text-left mb-2 flex justify-between'>Creaste esta nota el día: {fecha}                    
                </p>

                <div className='p-3 flex flex-row justify-between lg:flex-row'>
                    <button onClick={editarNota} type='button' className=' bg-gray-300 px-10 rounded-md hover:bg-white hover:text-black ease-in-out duration-400'>Editar</button>

                    <button type='button' onClick={() => confirmDelete(nota.id)}className='text-white bg-red-600 px-10 rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-400'>Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default Nota
