import Nota from './Nota'
import Spinner from './Spinner'
import Error from './Error'

const ListaNotas = ({notasBD, setNota, confirmDelete, goForm, loading}) => {
    return (
    <div className='lg:w-1/2 mb-10 lg:mb-0'> 
        {notasBD.length > 0 ? (
            <>    
                {loading ? (<Spinner/>) : (
                   <>
                     <h2 className='text-white font-black text-xl md:text-2xl text-center my-6'>Administra tus notas{''}
                         <span className='text-indigo-600'> aquí</span>
                     </h2> 
                     <div className='md:overflow-y-scroll md:overflow-hidden md:max-h-96'>
                         {notasBD.map((nota) => (
                             <Nota 
                                 key={nota.id}
                                 nota={nota}
                                 setNota={setNota}
                                 confirmDelete={confirmDelete}
                                 goForm={goForm}
                                 loading={loading}
                             />
                         ))}
                     </div>
                   </>
                )}                            

            </>
        ) : (
            ''
        )}   
    </div>
  )
}

export default ListaNotas
