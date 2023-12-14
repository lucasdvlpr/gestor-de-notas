import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Error from "../components/Error"
import Spinner from "../components/Spinner";

export default function Login({setEstaAutenticado}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        setTimeout(function(){
            if([username,password].includes('')){
                setError('No dejes campos vacíos.')
            }else{
                const usuario = {
                    username,
                    password,
                }
                fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(usuario)
                })
                .then(response => response.json())
                .then(data => {
                    setUsername('');
                    setPassword('');
                    setError('');
                    setLoading(false);
                    localStorage.setItem('user', usuario.username)
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('auth', true);
                    setEstaAutenticado(true);
                    navigate('/dashboard', { replace: true })
                    // console.log('Login exitoso:', data);
                })
                .catch(error => {
                    console.error('Error de red', error);
                    setError('Datos incorrectos.')
                })
            }
            setLoading(false);
        },1250)
    }

    return(
        <div className='mx-auto container md:w-1/2 lg:w-1/3'>
            <div className="mx-6 md:mx-0">
                <h1 
                    id="title"
                    className="text-white font-black text-3xl md:text-2xl text-center my-6" >
                        Inicia sesión
                </h1>

                <form className="bg-indigo-800 p-5 rounded-md" onSubmit={handleSubmit}>

                <div className="mb-5">
                    <label htmlFor="user" className='text-white text-md mb-2'>Usuario</label>
                    <input 
                        name='usuario' 
                        id="user" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Escribe tu nombre de usuario" 
                        className="p-2 border-2 border-gray-900 w-full mt-2 placeholder-indigo-400 rounded-md" 
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="password" 
                        className='text-white text-md mb-2'>Constraseña
                    </label>
                    <input
                        name="constrasena" 
                        id='password' 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Escribe tu contraseña" className="p-2 border-2 border-gray-900 w-full mt-2 placeholder-indigo-400 rounded-md"
                    />
                </div>

                {error && <Error>{error} <button onClick={() => {setError('')}}>X</button></Error>}

                <p className="text-white mb-5">¿No tenés una cuenta?
                    <span className="text-indigo-300 pl-1 hover:underline">
                        <Link to={'/registro'}>Regístrate</Link>
                    </span>
                </p>

                {loading ? (<Spinner/>) : (
                    <input 
                        type="submit" 
                        value={'Iniciar sesión'}
                        className='mb-5 w-full bg-gray-900 p-3 text-white font-bold text-lg rounded-md hover:bg-gray-800 cursor-pointer ease-in-out duration-300'
                    />
                )}     
                </form>

            </div>
        </div>
    )
}