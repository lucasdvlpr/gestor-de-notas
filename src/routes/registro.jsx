import { useState } from "react";
import Error from '../components/Error'
import Spinner from "../components/Spinner";
import { generarId } from "../helpers/helpers";
import { useNavigate, Link } from "react-router-dom";


export default function Registro({setEstaAutenticado}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if([username,password,confirmPassword].includes('')){
                setError('No dejes campos vacíos.')
                return false; 
            }
            else if(!username.match(/^[a-zA-Z0-9-]+$/)){
                setError('El usuario no puede tener espacios y debe contener solo letras, números y guiones');
                return false;
            }
            else if(username.length < 6){
                setError('El usuario debe tener mínimo 6 letras.')
            }
            else if(username === password){
                setError('El usuario y la constraseña no pueden ser iguales.')
                return false;
            }
            else if(password.length < 8) {
                setError('La contraseña debe ser más segura.');
                return false;
            }
            else if(!username || !password){
                setError('Completá los datos correctamente.')
                return false;
            }
            else if(password != confirmPassword){
                setError('Tus contraseñas deben ser iguales.')
                return false;
            }
            else{
                
                const usuario = {
                    username,
                    password,
                    token : generarId()
                }
                // console.log(usuario)
                fetch('http://localhost:4000/api/registros', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(usuario)
                })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('user', usuario.username)
                    localStorage.setItem('token', usuario.token);
                    localStorage.setItem('auth', true);
                    setEstaAutenticado(true);
                    navigate('/dashboard', { replace: true })
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setError('');
                })
                .catch(error => {
                    console.error('Error de red', error);
                    setError('El nombre de usuario ya está en uso.')
                });
            }   
        }, 1250);
    }

    return(
        <div className='mx-auto container md:w-1/2 lg:w-1/3'>
            <div className="mx-6 md:mx-0 ">
                <h1 
                id="title"
                className="text-white font-black text-3xl md:text-2xl text-center my-6"
                >
                    Crea tu cuenta
                </h1>

                <form className="bg-indigo-800 p-5 rounded-md" onSubmit={handleSubmit}>

                <div className="mb-5">
                    <label
                        htmlFor="usuario" className='text-white text-md mb-2'>Usuario
                    </label>
                    <input 
                        name="user"
                        id='usuario' 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Escribe un nombre" 
                        className="p-2 border-2 border-gray-800 w-full mt-2 placeholder-indigo-400 rounded-md" 
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="password" 
                        className='text-white text-md mb-2'>Contraseña
                    </label>

                    <input 
                        name="contrasena"
                        id='password' 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Escribe una contraseña" className="p-2 border-2 border-gray-900 w-full mt-2 placeholder-indigo-400 rounded-md"
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="confirmPassword" 
                        className='text-white text-md mb-2'>Confirmá tu constraseña
                    </label>
                    <input 
                        name='confirm' 
                        id="confirmPassword" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Escribe tu contraseña nuevamente" className="p-2 border-2 border-gray-800 w-full mt-2 placeholder-indigo-400 rounded-md"
                    />
                </div>

                {error && 
                    <Error>
                        {error}
                        <button onClick={() => {setError('')}}>X</button>
                    </Error>
                }

                <p className="text-white mb-5">¿Ya tenés una cuenta?
                    <span className="text-indigo-300 pl-1 hover:underline">
                        <Link to={'/login'}>Inicia sesión</Link>
                    </span>
                </p>

                {loading ? (<Spinner/>) : (
                    <input 
                        type="submit" 
                        value={'Registrarme'}
                        className='mb-5 w-full bg-gray-900 p-3 text-white font-bold text-lg rounded-md hover:bg-gray-800 cursor-pointer ease-in-out duration-300'
                    />
                )}

                </form>
            </div>
        </div>
    )
}