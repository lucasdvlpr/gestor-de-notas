import {useEffect, useState} from 'react'
import OjoAbierto from '../svg/eye-svgrepo-com.svg'
import OjoCerrado from '../svg/eye-closed-svgrepo-com.svg'
export default function Usuario(){

    const [mostrarPassword, setMostrarPassword] = useState(false); 
    const [usuario, setUsuario] = useState({})
    const usuarioActivo = localStorage.getItem('user');

    const tomarUsuario = (username) => {
        try {
            fetch(`http://localhost:4000/api/registros/${username}`)
              .then(response => response.json())
              .then(data => {
                
                setUsuario(data);
              })
              .catch(error => {
                console.error('Error al obtener datos del usuario:', error);
              });
          } catch (error) {
            console.log(error);
        }
    }

    const handleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    }

    useEffect(()=>{
        tomarUsuario(usuarioActivo)
    },[])

    console.log(usuario)

    return (
    <div className='flex flex-col items-center'>
        <h2 className='text-white font-bold text-xl md:text-2xl text-center my-6'>
            Tus datos
        </h2> 

        <form className='bg-indigo-800 p-5 rounded-md mx-6 lg:w-1/3'>
            <div className='mb-5'>
                <label htmlFor="usuario" className='text-white text-md'>Tu nombre de usuario</label>
                <input type="text" id='usuario' placeholder={usuario.username} className="p-2 border-2 border-gray-800 w-full mt-2 placeholder-indigo-400 rounded-md" />
            </div>
            <div className='mb-5'>
                
                <div className='flex justify-between'>

                <label htmlFor="contraseña" className='text-white text-md'>Nueva contraseña</label>
                    
                    <button type="button" onClick={handleMostrarPassword}>
                        {mostrarPassword ? (
                        <img src={OjoCerrado} alt="Ocultar contraseña" />
                        ) : (
                        <img src={OjoAbierto} alt="Mostrar contraseña" />
                        )}
                    </button>
                </div>
                <input type={mostrarPassword ? 'text' : 'password'} id='contraseña' className="p-2 border-2 border-gray-800 w-full mt-2 placeholder-indigo-400 rounded-md" value={'passowrd'} onChange={(e)=>{e.target.value}}/>
                
            </div>
            <div className='mb-5'>
                <label htmlFor="validaContraseña" className='text-white text-md'>Para modificar tu contraseña debes validar la antigua.</label>
                <input type={mostrarPassword ? 'text' : 'password'} id='validaContraseña' className="p-2 border-2 border-gray-800 w-full mt-2 placeholder-indigo-400 rounded-md" />
                
            </div>
        </form>
    </div>
    )
}

