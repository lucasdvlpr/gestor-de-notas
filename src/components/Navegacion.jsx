import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <div className="bg-indigo-800 p-3">
            <ul className="flex justify-between ">
                {estaAutenticado ? 
                    (
                        ''  
                    ) 
                :   
                    (
                        <li>
                            <Link className={location.pathname === '/' ? 'text-slate-800 bg-indigo-300 px-4 py-1 rounded-md cursor-pointer': "text-white hover:bg-indigo-500 px-4 py-1 rounded-md cursor-pointer"} to={'/'}>Inicio</Link>
                        </li>
                    )
                }
                

                <li>
                    {estaAutenticado ? 
                    (
                    
                            <Link className={location.pathname === '/dashboard' ? 'text-slate-800 bg-indigo-300 px-4 py-1 rounded-md cursor-pointer': "text-white hover:bg-indigo-500 px-4 py-1 rounded-md cursor-pointer"} to={'/dashboard'}>Dashboard</Link>
                        
                    ) 
                    : 
                    (
                    
                            <Link className={location.pathname === '/registro' ? 'text-slate-800 bg-indigo-300 px-4 py-1 rounded-md cursor-pointer': "text-white hover:bg-indigo-500 px-4 py-1 rounded-md cursor-pointer"} to={'/registro'}>Registro</Link>
                        
                    )
                    }
                </li>
                
                <li>
                    {estaAutenticado ? ( <a className="logout bg-red-500 rounded-md px-4 py-1 text-white hover:bg-red-700 cursor-pointer" onClick={() => {logout()}}>Cerrar sesión</a> ) : ( 
                        <Link className={location.pathname === '/login' ? 'text-slate-800 bg-indigo-300 px-4 py-1 rounded-md cursor-pointer': "text-white hover:bg-indigo-500 px-4 py-1 rounded-md cursor-pointer"} to={'/login'}>Iniciar sesión</Link>
                    )}
                </li>
                
            </ul>
        </div>
    )
}