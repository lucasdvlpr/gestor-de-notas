import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import '../styles/nav-styles.css'

export default function Navegacion({estaAutenticado, setEstaAutenticado, modoOscuro, setModoOscuro}){
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
        <nav className="sticky backdrop-blur-lg lg:min-h-screen">
            <ul className="flex lg:flex-col sticky top-0 justify-between items-center lg:gap-12">
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
                            <Link className={location.pathname === '/login' ? 'buttonCheck bg-green-500 text-white': "buttonNotCheck"} to={'/login'}>Ingresar</Link>
                        )
                    }
                </li>
                
            </ul>
        </nav>
    )
}