import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import '../styles/nav-styles.css'

export default function Navegacion({estaAutenticado, setEstaAutenticado}){
    const location = useLocation();

    const logout = () => {
        const res = confirm('¿Estás seguro que querés cerrar sesión?');

        if(res){
            console.log('Sesión cerrada.')
            setEstaAutenticado(false);
            localStorage.setItem('token', '');
            localStorage.setItem('auth', false);
            localStorage.setItem('user', '')
        }

        
    }

    return(
        <nav className="lg:min-h-screen">
            <ul className=" lg:flex-col lg:sticky lg:top-5 lg:gap-12">
                <div className="flex gap-2 lg:flex-col lg:items-center">
                    {estaAutenticado ? 
                        (
                            ''  
                        ) 
                    :   
                        (
                            <li>
                                <Link className={location.pathname === '/' ? 'buttonCheck': " buttonNotCheck"} to={'/'}>Inicio</Link>
                            </li>
                        )
                    }
                                    
                    {estaAutenticado ? 
                    (
                            <li>
                                <Link className={location.pathname === '/dashboard' ? 'buttonCheck': "buttonNotCheck"} to={'/dashboard'}>Dashboard
                                </Link>
                            </li>
                            
                        
                    ) 
                    : 
                    (
                            <li>
                                <Link className={location.pathname === '/registro' ? 'buttonCheck': "buttonNotCheck"} to={'/registro'}>Registro</Link>
                            </li>
                    )
                    }
    
                    {estaAutenticado ? 
                        (<li>
                            <Link className={location.pathname === '/usuario' ? 'buttonCheck': "buttonNotCheck"} to={'/usuario'}>Mi cuenta</Link>
                        </li>)
                        :
                        ('')
                    }
                </div>
                
                <li>
                    {estaAutenticado ? 
                        ( 
                            <a className="buttonSalir" onClick={() => {logout()}}>Salir</a> 
                        ) 
                        : 
                        ( 
                            <Link className={location.pathname === '/login' ? 'buttonCheck bg-gray-800 text-white': "buttonNotCheck bg-gray-900"} to={'/login'}>Ingresar</Link>
                        )
                    }
                </li>
                
            </ul>
        </nav>
    )
}