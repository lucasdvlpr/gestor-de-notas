import Nota from './Nota'
import Spinner from './Spinner'
import Error from './Error'

const ListaNotas = ({notasBD, setNota, confirmDelete, goForm, loading}) => {
    return (
    <section> 
        {notasBD.length > 0 ? (
            <>    
                {loading ? (<Spinner/>) : (
                   <>
                     <h2 className='text-white font-black text-xl md:text-2xl text-center py-5 pb-8'>Administra tus notas{''}
                         <span className='text-indigo-600'> aquí</span>
                     </h2> 
                     <article className='overflow-y-scroll overflow-hidden flex md:flex-row flex-wrap gap-3 justify-center items-center'>
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
                     </article>
                   </>
                )}                            

            </>
        ) : (
            ''
        )}   
    </section>
  )
}

export default ListaNotas
